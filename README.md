# 🏥 Patient Registration Web App

A modern, full-featured patient registration web application built with **React**, **Vite**, **PGlite (PostgreSQL via IndexedDB)**, and **Tailwind CSS**. The app allows clinics to register new patients, view or query records using SQL, and manage patient data across multiple browser tabs with real-time sync.

---

## 🚀 Features

- ✅ Easy, formal patient registration form
- ✅ Multi-tab sync using `BroadcastChannel`
- ✅ Raw SQL query support (SELECT, DELETE, etc.)
- ✅ Data persistence via IndexedDB (PGlite)
- ✅ Modern UI with Tailwind + React Icons
- ✅ Works offline (no server required)
- ✅ Beautiful medical-themed homepage

---

## 📂 Project Structure
project-root/
├── node_modules/ # Installed dependencies
├── public/
│ └── vite.svg # Public Vite logo (used in templates or favicon)
├── src/
│ ├── assets/
│ │ └── react.svg # Optional asset used in your UI
│ ├── App.jsx # Routing and layout
│ ├── db.js # IndexedDB setup and SQL execution
│ ├── PatientForm.jsx # Patient registration form with validations and styling
│ ├── PatientList.jsx # Patient list viewer (if used)
│ ├── SQLQuery.jsx # SQL input and query results
│ ├── home.jsx # Landing page (hero, about, features)
│ ├── index.css # Tailwind/global styles
│ └── App.css # Component-level styles
├── .gitignore # Git exclusions (e.g., node_modules)
|── README.md # Project documentation
├── package.json # Project metadata and dependencies
├── package-lock.json # Exact dependency tree (npm)
├── vite.config.js # Vite bundler configuration
└── README.md # Project documentation
 
## 🛠️ How to Set Up

 1. Clone the Repository
    git clone https://github.com/your-username/patient-registration-app.git
    cd patient-registration-app

 2. Install Dependencies
    npm install

 3. Run the App
    npm run dev

## 🧑‍💻 Usage Guide

🔹 Register a New Patient

Click "Register Here" or scroll down on the homepage.

Fill out the full registration form with:

First/Last name, Contact info

Emergency contact, Address

Medical history, allergies, medications

Click "Register Patient".

✅ The data will appear in your local database.

🔹 Run Raw SQL

Scroll to the bottom of the registration page.

Enter any valid SQL query (e.g., SELECT * FROM patients;).

Click "Run Query".

⚠️ If you use DELETE, DROP, or TRUNCATE, a warning will appear before execution.

🔹 Multi-Tab Support

Open the app in multiple tabs.

Register a patient in one tab — it will reflect live in the others.

💡 Customization

Change clinic name in home.jsx header:

<div className="text-2xl font-bold">HealthCare Hub</div>

Replace background image in hero section using your own image URL or file.

Modify or extend the SQL schema in db.js

📦 Dependencies

React

Vite

PGlite (PostgreSQL in IndexedDB)

Tailwind CSS

React Icons

📄 License

This project is for educational and demo purposes. Feel free to modify and use it for personal or academic use.

🙌 Credits

Built with ❤️ by [Your Name], inspired by the need to simplify patient intake and medical record access in local clinics.


  
  


