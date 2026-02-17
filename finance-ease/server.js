const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');

// 1. Load environment variables FIRST
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Setup View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 3. Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret_please_change',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// 5. Global Variables for Views
app.use((req, res, next) => {
    res.locals.user = req.session.userId ? { username: req.session.username } : null;
    res.locals.error = null; // Default error to null to avoid ejs errors
    next();
});

// 6. Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/calculatorRoutes'));

// Homepage
app.get('/', (req, res) => {
    res.render('index', { title: 'FinanceEase Home' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send(`
        <div style="text-align:center; padding: 50px; font-family: sans-serif;">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Go Home</a>
        </div>
    `);
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
    console.error('🔥 Global Error:', err.stack);
    res.status(500).send(`
        <div style="text-align:center; padding: 50px; font-family: sans-serif;">
            <h1>500 - Server Error</h1>
            <p>Something went wrong on our end.</p>
            <pre style="text-align:left; background:#f0f0f0; padding:20px; overflow:auto;">${process.env.NODE_ENV === 'development' ? err.stack : 'Please contact support.'}</pre>
            <a href="/">Go Home</a>
        </div>
    `);
});

// Start Server (Only if not running on Vercel)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`--------------------------------------------------`);
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
        console.log(`--------------------------------------------------`);
    });
}

// Export the app for Vercel
module.exports = app;
