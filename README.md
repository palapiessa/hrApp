<h1 align="center">🌟 HR Management System (React + JSON Server API) 🌟</h1>

<p align="center">
A modern, user-friendly HR management web application built with <strong>React</strong>, <strong>React Router</strong>, <strong>Axios</strong>, and a <strong>JSON Server backend</strong>.
<br/>
This system enables teams to manage employees, track work experience, and automate HR reminders.
</p>

<p align="center">
  <a href="https://hrapp-1-68tb.onrender.com"><strong>🌐 Live Demo</strong></a> •
  <a href="https://hrapp-bec7.onrender.com/employees"><strong>📡 Backend API</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue" />
  <img src="https://img.shields.io/badge/JSON--Server-API-green" />
  <img src="https://img.shields.io/badge/Status-Live-success" />
  <img src="https://img.shields.io/badge/Maintainer-Bita%20Yeganeh-pink" />
</p>

---

## ⭐ Features

### 👥 Employee Management

- 📄 View all employees
- ➕ Add new employees
- ✏️ Edit department, salary, phone, skills, and more
- ❌ Delete employees
- ⚡ Instant UI update on CRUD actions

---

### 📅 Work Experience Automation

Automatically calculates work experience based on `hireDate`:

| Condition                             | HR Reminder                         |
| ------------------------------------- | ----------------------------------- |
| Work anniversary (5, 10, 15, … years) | 🎉 **Schedule recognition meeting** |
| Less than 6 months                    | 🔔 **Schedule probation review**    |

---

### 🎨 Clean & Modular UI

- 🧩 Employee cards with emoji avatars
- 🔄 Edit & display modes
- ℹ️ About page
- 🚫 404 error page
- 📌 Consistent layout with header + footer

---

### 🧩 Reusable Architecture

- ⚙ Custom `useAxios()` hook
- 🔧 Utilities:
  - `calculateWorkExperience.js`
  - `animalEmoji.js`
- 🗂 Organized component structure & CSS modules

---

## 📁 Project Structure

src/
├── App.jsx
├── Layout.jsx
├── config.js
├── main.jsx
├── components/
│ ├── Header.jsx
│ ├── Footer.jsx
│ ├── PersonList.jsx
│ ├── Employee.jsx
│ ├── PersonCard.jsx
├── pages/
│ ├── AddEmployee.jsx
│ ├── About.jsx
│ └── ErrorPage.jsx
├── hooks/
│ └── useAxios.js
├── utils/
│ ├── calculateWorkExperience.js
│ └── animalEmoji.js
└── styles/

---

🐾 Emoji Generator:

Converts animal names like:
"Owl", "Snake", "Fox" into cute emoji avatars.

---

🎯 Highlights:
🧍 PersonCard Component
🔄 Edit & display modes
📝 PUT & DELETE support

---

📌 Displays:

- Name
- Phone
- Salary
- Department
- Skills
- Work experience
- Automated reminders
- ♻ Auto-refresh after backend updates

---

➕ AddEmployee Page:

- Dynamic form based on fields[]
- Fully controlled inputs
- Automatically converts comma-separated skills → array
- Submits through onAddEmployee()

---

🌐 Deployment:

The application is fully deployed on Render.

Service Link:

🎨 Frontend:
https://hrapp-1-68tb.onrender.com

🗄 Backend API:
https://hrapp-bec7.onrender.com/employees

---

👤 Author
Bita Yeganeh
🔗 GitHub: https://github.com/BitaYeganeh

📜 License

This project is open-source.
Feel free to modify, improve, and share it! 💙

---

🔧 Infrastructure Notes

The script creates resource `frontierweek-hrapp-test-rg` and static web app `frontierweek-hrapp-test`.
It is idempotent and leaves an existing Static Web App unchanged.

It is idempotent for the App Service resources; each run re-deploys the latest `db.json` content.