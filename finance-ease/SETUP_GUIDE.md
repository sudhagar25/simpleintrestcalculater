# 🛠 FinanceEase – Local Setup & Runner Guide

This guide provides step-by-step instructions to set up and run the **FinanceEase** application locally. It covers database configuration, environment setup, and common troubleshooting tips.

---

## 1. Database Setup 🗄️

FinanceEase uses **MySQL** to store user data and calculation history.

### **Step 1: Create the Database**
Access your MySQL server (via CLI, Workbench, or phpMyAdmin) and run the following command to create the database:

```sql
CREATE DATABASE IF NOT EXISTS finance_ease_db;
USE finance_ease_db;
```

### **Step 2: Import Roles & Tables**
Run the SQL script located in `database.sql` to create the necessary tables (`users` and `history`).

**Using Command Line:**
Navigate to the project folder and run:
```bash
mysql -u root -p finance_ease_db < database.sql
```
*Enter your MySQL password when prompted.*

**Using GUI (Workbench/phpMyAdmin):**
1.  Open the `finance_ease_db` database.
2.  Select "Import" or "Run SQL Script".
3.  Choose the `database.sql` file from the project root.
4.  Execute.

---

## 2. Environment Configuration ⚙️

The application uses a `.env` file to manage sensitive configuration.

### **Step 1: Create .env File**
Create a file named `.env` in the root directory of the project.

### **Step 2: Configure Variables**
Copy and paste the following content into your `.env` file. Update the values to match your local setup.

```env
# Database Configuration
DB_HOST=localhost        # Hostname of your MySQL server (usually localhost)
DB_USER=root             # Your MySQL username
DB_PASSWORD=your_password # Your MySQL password (leave empty if none)
DB_NAME=finance_ease_db  # Name of the database we created earlier

# Application Configuration
SESSION_SECRET=your_secret_key_here  # A secret string for signing session ID cookies
PORT=3000                            # The port server will listen on
```

---

## 3. Install Dependencies 📦

FinanceEase is built with Node.js and relies on several packages managed by `npm`.

### **Step 1: Open Terminal**
Open your command prompt or terminal and navigate to the project folder:
```bash
cd path/to/finance-ease
```

### **Step 2: Install Packages**
Run the following command to install all dependencies listed in `package.json` (express, mysql2, bcryptjs, ejs, dotenv, etc.):
```bash
npm install
```

---

## 4. Run the Application 🚀

### **Option A: Production Mode**
To start the server normally:
```bash
npm start
```
*This uses `node server.js` to launch the application.*

### **Option B: Development Mode (Recommended)**
To start the server with auto-restart on file changes (requires `nodemon`):
```bash
npm run dev
```

**What happens when the server starts?**
1.  `dotenv` loads your environment variables.
2.  Express configures the server, views, and static folders.
3.  MySQL connection pool is established.
4.  Server starts listening on `http://localhost:3000`.

---

## 5. Access the Application 🌐

Open your web browser and navigate to:

👉 **http://localhost:3000**

### **How to Use:**
1.  **Homepage**: View all available calculators.
2.  **Registration**: Click "Register" to create a new account.
    -   *Logic*: Password is hashed using `bcryptjs` before creating a record in the `users` table.
3.  **Login**: Access your account with email/password.
    -   *Logic*: Authentication creates a session (stores `userId` in cookie).
4.  **Calculators**: Perform Simple Interest, Compound Interest, or EMI calculations.
    -   *Logic*: For logged-in users, the controller calculates the result and **automatically saves** it to the `history` table.
5.  **Dashboard**: View your past calculations.
    -   *Logic*: Fetches records from `history` where `user_id` matches your session.

---

## 6. Common Errors & Fixes ⚠️

| Error Issue | Possible Cause | Solution |
| :--- | :--- | :--- |
| **Connection Refused / Access Denied** | Incorrect DB credentials in `.env` or MySQL server not running. | Check `DB_USER`, `DB_PASSWORD` in `.env`. Ensure MySQL service is `Running`. |
| **Tables `users` or `history` not found** | Forgot to import `database.sql`. | Run the SQL import steps in Section 1. |
| **Port 3000 already in use** | Another app is using port 3000. | Change `PORT` in `.env` to 3001 or kill the other process. |
| **Session not persisting** | Browser blocking cookies or `SESSION_SECRET` missing. | ensuring `SESSION_SECRET` is set. Try Incognito mode. |
| **`npm install` fails** | Node.js not installed or network issues. | Install Node.js LTS from [nodejs.org](https://nodejs.org/). |

---

*This guide aims to help developers and interviewers set up the FinanceEase environment quickly and efficiently.*
