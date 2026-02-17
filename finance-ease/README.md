# 💰 FinanceEase – Simple Interest & EMI Calculator Portal

**FinanceEase** is a web-based financial tool designed to simplify complex calculations like **Simple Interest**, **Compound Interest**, and **Loan EMI**. Built with a focus on simplicity and accuracy, it helps users make informed financial decisions effortlessly.

This project follows the **MVC (Model-View-Controller)** architecture and demonstrates a clean, modular, and scalable Node.js application structure with **User Authentication** and **Database Integration**.

---

## 🚀 Features

### ✅ Core Features
- **Simple Interest Calculator**: Calculate interest and total amount for principal sums.
- **Compound Interest Calculator**: Understand the power of compounding with precise annual breakdowns.
- **EMI Calculator**: Plan loan repayments with monthly installment, total interest, and total payment breakdowns.
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
- **Clean UI/UX**: Professional blue-and-white financial theme with intuitive navigation.

### 🔐 User Features
- **User Authentication**: Secure Login and Registration system using `bcryptjs` and sessions.
- **Dashboard**: Personalized dashboard to view calculation history.
- **Calculation History**: Automatically saves calculations to a MySQL database for logged-in users.
- **History Management**: Option to delete past calculation records.

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Templating), HTML5, CSS3, JavaScript (ES6+)
- **Database**: MySQL (using `mysql2` pool)
- **Authentication**: Session-based auth with `express-session` & `bcryptjs`
- **Architecture**: MVC Pattern (Model-View-Controller)

---

## 📂 Project Structure

```bash
finance-ease/
├── config/              # Database configuration (db.js)
├── controllers/         # Business Logic (auth & calculator controllers)
├── middleware/          # Custom Middleware (auth checks)
├── public/
│   ├── css/             # Stylesheets (style.css)
│   └── js/              # Client-side scripts
├── routes/              # Express Routes (auth & calculator routes)
├── views/               # EJS Templates
│   ├── index.ejs        # Homepage
│   ├── login.ejs        # Login Page
│   ├── register.ejs     # Register Page
│   ├── dashboard.ejs    # User Dashboard
│   ├── simple-interest.ejs
│   ├── compound-interest.ejs
│   └── emi.ejs
├── database.sql         # Database Schema
├── .env                 # Environment Variables
├── server.js            # Entry Point
├── package.json         # Project Metadata & Dependencies
└── README.md            # Project Documentation
```

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/finance-ease.git
    cd finance-ease
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Database Setup**
    - Create a MySQL database named `finance_ease_db`.
    - Import the schema from `database.sql`:
      ```bash
      mysql -u root -p finance_ease_db < database.sql
      ```

4.  **Environment Configuration**
    - Create a `.env` file in the root directory (or use the provided template).
    - Add your database credentials:
      ```env
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=your_password
      DB_NAME=finance_ease_db
      SESSION_SECRET=your_secret_key
      PORT=3000
      ```

5.  **Start the Server**
    ```bash
    npm start
    # OR for development (with nodemon)
    npm run dev
    ```

6.  **Access the Application**
    Open your browser and visit: `http://localhost:3000`

---

## 🔮 Future Improvements

-   **Graph Visualization**: Add charts (Chart.js) to visualize interest growth vs. principal.
-   **PDF Export**: Allow users to download calculation summaries as PDF.
-   **Password Reset**: Email-based password reset flow.
-   **Profile Management**: Update user details and password.

---

## 👤 Author

**Sudha**  
Full-Stack Developer  
[Portfolio](https://iamtayyab.com) | [LinkedIn](https://linkedin.com/in/your-profile) | [GitHub](https://github.com/your-github)
