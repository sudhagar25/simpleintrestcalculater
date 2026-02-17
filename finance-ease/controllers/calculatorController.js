const db = require('../config/firebase');

exports.getDashboard = async (req, res) => {
    try {
        if (!db) throw new Error('Database not initialized');
        if (!req.session.userId) return res.redirect('/login');

        const historySnapshot = await db.collection('history')
            .where('userId', '==', req.session.userId)
            .orderBy('createdAt', 'desc')
            .get();

        const history = [];
        historySnapshot.forEach(doc => {
            const data = doc.data();
            history.push({
                id: doc.id,
                ...data,
                formatted_date: new Date(data.createdAt).toLocaleString()
            });
        });

        res.render('dashboard', { history, error: null });
    } catch (err) {
        console.error('❌ Dashboard Error:', err);
        // Don't crash, just show empty history with error
        res.render('dashboard', {
            history: [],
            error: 'Could not load history. Please try again later.'
        });
    }
};

exports.deleteHistory = async (req, res) => {
    const { id } = req.params;
    try {
        if (!db) throw new Error('Database not initialized');

        const docRef = db.collection('history').doc(id);
        const doc = await docRef.get();

        if (doc.exists && doc.data().userId === req.session.userId) {
            await docRef.delete();
            console.log(`Deleted history item: ${id}`);
        }
        res.redirect('/dashboard');
    } catch (err) {
        console.error('❌ Delete Error:', err);
        res.redirect('/dashboard');
    }
};

// Helper function to save history
async function saveHistory(userId, type, input, result) {
    if (!userId || !db) return;
    try {
        await db.collection('history').add({
            userId: userId,
            type: type,
            input_data: input,
            result_data: result,
            createdAt: new Date().toISOString()
        });
        console.log(`Saved ${type} calculation for user ${userId}`);
    } catch (err) {
        console.error('❌ Error saving history:', err);
        // Non-critical, so we don't converting this to a user-facing error here
    }
}

exports.calculateSI = async (req, res) => {
    const { principal, rate, time } = req.body;
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    // Validate Input
    if (isNaN(p) || isNaN(r) || isNaN(t) || p < 0 || r < 0 || t < 0) {
        return res.render('simple-interest', {
            result: null,
            input: req.body,
            error: 'Please enter valid positive numbers.'
        });
    }

    const interest = (p * r * t) / 100;
    const total = p + interest;

    const result = {
        principal: p.toFixed(2),
        interest: interest.toFixed(2),
        total: total.toFixed(2)
    };

    if (req.session.userId) {
        await saveHistory(req.session.userId, 'Simple Interest', { Principal: p, Rate: r, Time: t }, result);
    }

    res.render('simple-interest', { result, input: req.body, error: null });
};

exports.calculateCI = async (req, res) => {
    const { principal, rate, time } = req.body;
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p < 0 || r < 0 || t < 0) {
        return res.render('compound-interest', {
            result: null,
            input: req.body,
            error: 'Please enter valid positive numbers.'
        });
    }

    const amount = p * Math.pow((1 + r / 100), t);
    const interest = amount - p;

    const result = {
        principal: p.toFixed(2),
        interest: interest.toFixed(2),
        total: amount.toFixed(2)
    };

    if (req.session.userId) {
        await saveHistory(req.session.userId, 'Compound Interest', { Principal: p, Rate: r, Time: t }, result);
    }

    res.render('compound-interest', { result, input: req.body, error: null });
};

exports.calculateEMI = async (req, res) => {
    const { amount, rate, months } = req.body;
    const p = parseFloat(amount);
    const r_annual = parseFloat(rate);
    const n = parseFloat(months);

    if (isNaN(p) || isNaN(r_annual) || isNaN(n) || p < 0 || r_annual < 0 || n <= 0) {
        return res.render('emi', {
            result: null,
            input: req.body,
            error: 'Please enter valid positive numbers.'
        });
    }

    const r = r_annual / 12 / 100;
    let emi = 0;

    if (r === 0) {
        emi = p / n;
    } else {
        emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    const result = {
        emi: emi.toFixed(2),
        interest: totalInterest.toFixed(2),
        total: totalPayment.toFixed(2)
    };

    if (req.session.userId) {
        await saveHistory(req.session.userId, 'EMI Calculator', { Loan: p, Rate: r_annual, Months: n }, result);
    }

    res.render('emi', { result, input: req.body, error: null });
};
