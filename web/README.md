
## HR Web App
<h1 align="center">🌟 HR Management System (React + JSON Server API) 🌟</h1>

<p align="center">
A modern, user-friendly HR management web application built with <strong>React</strong>, <strong>React Router</strong>, <strong>Axios</strong>, and a <strong>JSON Server backend</strong>.
<br/>
This system enables teams to manage employees, track work experience, and automate HR reminders.
</p>

#### 👥 Employee Management

- 📄 View all employees
- ➕ Add new employees
- ✏️ Edit department, salary, phone, skills, and more
- ❌ Delete employees
- ⚡ Instant UI update on CRUD actions

---

#### 📅 Work Experience Automation

Automatically calculates work experience based on `hireDate`:

| Condition                             | HR Reminder                         |
| ------------------------------------- | ----------------------------------- |
| Work anniversary (5, 10, 15, … years) | 🎉 **Schedule recognition meeting** |
| Less than 6 months                    | 🔔 **Schedule probation review**    |

---

#### 🎨 Clean & Modular UI

- 🧩 Employee cards with emoji avatars
- 🔄 Edit & display modes
- ℹ️ About page
- 🚫 404 error page
- 📌 Consistent layout with header + footer

---

#### 🧩 Reusable Architecture

- ⚙ Custom `useAxios()` hook
- 🔧 Utilities:
  - `calculateWorkExperience.js`
  - `animalEmoji.js`
- 🗂 Organized component structure & CSS modules

---

### 📁 Project Structure

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
  ♻ Auto-refresh after backend updates

---

➕ AddEmployee Page:

- Dynamic form based on fields[]
- Fully controlled inputs
- Automatically converts comma-separated
- skills → array
- Submits through onAddEmployee()

---

👤 Authors

Bita Yeganeh
🔗 GitHub: https://github.com/BitaYeganeh

Petri Alapiessa
🔗 GitHub: https://github.com/palapiessa

📜 License

This project is open-source.
Feel free to modify, improve, and share it! 💙
