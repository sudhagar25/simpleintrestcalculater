const bcrypt = require('bcryptjs');
const db = require('../config/firebase');

// Render Register Page
exports.getRegister = (req, res) => {
    res.render('register', { error: null });
};

// Render Login Page
exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

// Handle Registration Logic
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Input Validation
        if (!username || !email || !password) {
            return res.render('register', { error: 'All fields are required.' });
        }

        if (password.length < 6) {
            return res.render('register', { error: 'Password must be at least 6 characters long.' });
        }

        // 2. Check if user exists
        if (!db) throw new Error('Database not initialized');

        const userQuery = await db.collection('users').where('email', '==', email).limit(1).get();

        if (!userQuery.empty) {
            return res.render('register', { error: 'Email already registered. Please login.' });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create new user document
        const newUserRef = db.collection('users').doc();
        await newUserRef.set({
            username: username.trim(),
            email: email.trim(),
            password: hashedPassword, // Store hashed password
            createdAt: new Date().toISOString()
        });

        console.log(`✅ User registered: ${email}`);
        res.redirect('/login');

    } catch (err) {
        console.error('❌ Registration Error:', err);
        res.render('register', { error: 'Server error. Please try again later.' });
    }
};

// Handle Login Logic
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Input Validation
        if (!email || !password) {
            return res.render('login', { error: 'All fields are required.' });
        }

        if (!db) throw new Error('Database not initialized');

        // 2. Find user by email
        const userQuery = await db.collection('users').where('email', '==', email).limit(1).get();

        if (userQuery.empty) {
            return res.render('login', { error: 'Invalid email or password.' });
        }

        const userDoc = userQuery.docs[0];
        const user = userDoc.data();

        // 3. Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login', { error: 'Invalid email or password.' });
        }

        // 4. Create Session
        req.session.userId = userDoc.id;
        req.session.username = user.username;

        // 5. Save session before redirecting
        req.session.save(err => {
            if (err) {
                console.error('Session Save Error:', err);
                return res.render('login', { error: 'Login failed. Please try again.' });
            }
            console.log(`✅ User logged in: ${email}`);
            res.redirect('/dashboard');
        });

    } catch (err) {
        console.error('❌ Login Error:', err);
        res.render('login', { error: 'Server error. Please try again later.' });
    }
};

// Handle Logout
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.error('Logout Error:', err);
        res.redirect('/login');
    });
};
