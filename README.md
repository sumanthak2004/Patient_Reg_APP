# 🏥 Patient Registration Web App

A modern, full-featured patient registration web application built with **React**, **Vite**, **PGlite (PostgreSQL via IndexedDB)**, and **Tailwind CSS**. The app allows clinics to register new patients, view or query records using SQL, and manage patient data across multiple browser tabs with real-time sync.

## 🌐 Live Demo

👉 **[Access the deployed app on Vercel](https://patient-reg-app-psi.vercel.app/)**

## 🚀 Features

- ✅ Easy, formal patient registration form
- ✅ Multi-tab sync using `BroadcastChannel`
- ✅ Raw SQL query support (SELECT, DELETE, etc.)
- ✅ Data persistence via IndexedDB (PGlite)
- ✅ Modern UI with Tailwind + React Icons
- ✅ Works offline (no server required)
- ✅ Beautiful medical-themed homepage

## 📂 Project Structure

```
project-root/
├── node_modules/           # Installed dependencies
├── public/
│   └── vite.svg           # Public Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg      # React asset
│   ├── App.jsx            # Routing and layout
│   ├── db.js              # IndexedDB setup and SQL execution
│   ├── PatientForm.jsx    # Patient registration form
│   ├── PatientList.jsx    # Patient list viewer
│   ├── SQLQuery.jsx       # SQL input and query results
│   ├── home.jsx           # Landing page
│   ├── index.css          # Tailwind/global styles
│   └── App.css            # Component-level styles
├── .gitignore             # Git exclusions
├── eslint.config.js       # ESLint configuration
├── index.html             # Main HTML entry point
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Exact dependency tree
├── vite.config.js         # Vite bundler configuration
└── README.md              # Project documentation
```

## 🛠️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/patient-registration-app.git
   cd patient-registration-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the App**
   ```bash
   npm run dev
   ```

## 🧑‍💻 Usage Guide

### 🔹 Register a New Patient
1. Click "Register Here" or scroll down on the homepage
2. Fill out the registration form with:
   - First/Last name, Contact info
   - Emergency contact, Address
   - Medical history, allergies, medications
3. Click "Register Patient"
4. ✅ The data will be saved in your local database

### 🔹 Run Raw SQL Queries
1. Scroll to the bottom of the registration page
2. Enter any valid SQL query (e.g., `SELECT * FROM patients;`)
3. The name of table or the database is patients 
4. Click "Run Query"
5. ⚠️ Warning prompts appear for DELETE, DROP, or TRUNCATE operations

### 🔹 Multi-Tab Support
- Open the app in multiple tabs
- Register a patient in one tab — it will reflect live in the others
- Real-time synchronization across browser tabs

## 🚀 Deployment

This app is deployed on Vercel and can be accessed at:
**[https://your-project-name.vercel.app](https://patient-reg-app-psi.vercel.app/)**

To deploy your own version:
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically build and deploy your app

## 📦 Dependencies

- **React** - UI library
- **Vite** - Build tool and dev server
- **PGlite** - PostgreSQL in IndexedDB
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

## 📄 License

This project is for assessment and demo purposes. Feel free to modify and use it for personal or academic use.