# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🕒 AI-Powered Daily Time Tracking & Analytics Dashboard

A modern, responsive web application that helps users track how they spend their 24 hours each day by logging activities in minutes and visualizing the data using analytics and charts. The app includes secure authentication, date-wise tracking, and a powerful analytics dashboard.

---

## 🔗 Live Demo

👉 **Live Application:**  
https://bindujabavurupudi.github.io/ai-time-tracker

---
---

## 📌 Problem Statement

Design and develop a **Time Tracking Web Application** that:
- Allows users to log daily activities in minutes.
- Restricts total daily activity to **1440 minutes (24 hours)**.
- Provides a **date-wise analytics dashboard**.
- Displays a **“No Data Available”** state for empty dates.
- Includes **secure authentication**.
- Uses **AI tools** during the development process.
- Is **fully responsive** and **professionally deployed**.

---

## 🎯 Core Features

✅ Secure Google Authentication using Firebase  
✅ Date-based Activity Logging  
✅ Add, Edit, Delete Activities  
✅ 1440 Minutes Daily Limit Validation  
✅ Remaining Time Calculation  
✅ Category-based Time Tracking  
✅ Analytics Dashboard with Charts  
✅ “No Data Available” UI State  
✅ Fully Responsive Design  
✅ Deployed on GitHub Pages  

---

## 🤖 AI Tools Used

- **ChatGPT**
  - Code generation
  - Firebase integration help
  - Debugging routing & deployment
  - UI improvement suggestions
- **AI-assisted UI planning**
  - Layout structure
  - Button states & validation messages
  - Error handling UX
- **AI-generated Documentation**
  - README formatting
  - Feature breakdown
  - Submission readiness checklist

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Vite |
| Routing | React Router |
| Backend / DB | Firebase Firestore |
| Authentication | Firebase Google Auth |
| Styling | CSS |
| Charts | Recharts |
| Deployment | GitHub Pages |
| Version Control | Git |

---

## 📁 Project Structure
ai-time-tracker/
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Dashboard.jsx
│ │ └── Analytics.jsx
│ ├── firebase.js
│ ├── main.jsx
│ ├── App.jsx
│ └── index.css
├── public/
├── index.html
├── vite.config.js
├── package.json
└── README.md


---

## ✅ Functional Requirements Implemented

✔ User authentication with Firebase  
✔ Date-based activity logging  
✔ Firestore structured storage  
✔ Daily 1440-minute validation  
✔ Remaining time display  
✔ Analyse button behavior  
✔ Category-wise summary  
✔ Interactive analytics charts  
✔ No Data UI  
✔ Responsive across devices  

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository

git clone https://github.com/bindujabavurupudi/ai-time-tracker.git

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Set Up Firebase

Create a file:
src/firebase.js

Add your Firebase configuration:
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

