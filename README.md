<<<<<<< HEAD
# Chunchun Kumar Singh - Full-Stack Developer Portfolio

This is a production-ready, highly interactive full-stack developer portfolio built specifically for recruiters and tech interviewers to inspect backend, frontend, database, and AI integrations.

---

## ⚡ Technology Stack

### Frontend
- **React.js (Vite)**: Fast component-driven Single Page Application framework.
- **Tailwind CSS v4**: Primary styling system using native CSS variables and GPU compilation.
- **Axios**: Centralized HTTP client managing requests and admin authorization interceptors.
- **React Router**: Frontend routing for home sections, developer playground, and admin views.
- **Framer Motion**: Micro-interactions and transition animation triggers.
- **React Icons**: Icon glyphs for interactive buttons.

### Backend
- **Node.js & Express.js**: RESTful service controller, route layers, and security middleware.
- **mysql2**: Promise-based connection pool provider for MySQL databases.
- **JWT & bcryptjs**: Secure admin dashboard logins and stateless session authentication.
- **express-validator**: Rigid request body filtering preventing script/code injections.
- **Helmet, CORS, Rate Limiting**: Header protections and request limits.

### Database
- **MySQL**: Relational database managing users, projects, experiences, skills, certs, and logs.

### Artificial Intelligence
- **Google Gemini API**: Server-side LLM wrapper responding to queries about Chunchun's credentials.

---

## 📐 Systems Architecture

```
                 REACT (Client)
                   |
                 AXIOS (Client Requests)
                   |
            EXPRESS.JS API (Backend Controller & Middlewares)
                   |
               NODE.JS
             /         \
            /           \
        MYSQL          GEMINI AI
     (Database)     (Generative API)
```

---

## 📂 Project Structure

```
portfolio/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components (Navbar, Footer, Diagrams)
│   │   ├── pages/          # Layout views (Home, API Playground, Admin)
│   │   ├── sections/       # Landing page scrolling sections
│   │   └── services/       # Centralized Axios helper (api.js)
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express Backend
│   ├── config/             # DB Connection pool setup
│   ├── controllers/        # Business logic controllers
│   ├── middleware/         # JWT verify, validate input, error logs
│   ├── routes/             # REST Route endpoints
│   ├── services/           # Gemini AI client prompts
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env
│
├── database.sql            # MySQL DB schema & seed data
├── README.md
└── .gitignore
```

---

## 🛠️ Installation & Setup

### 1. MySQL Database Setup
1. Open your MySQL command-line or interface (e.g., MySQL Workbench).
2. Load and run the `database.sql` script located in the root of the project:
   ```sql
   SOURCE database.sql;
   ```
   *This creates the `chunchun_portfolio` schema and populates initial tables with seed rows.*

### 2. Backend Configuration
1. Open the `server/` directory.
2. Edit `server/.env` with your credentials:
   ```env
   PORT=5000
   CLIENT_URL=http://localhost:5173
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=chunchun_portfolio
   DB_PORT=3306
   JWT_SECRET=chunchun_secret_jwt_token_2026_key_for_authentication
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(If GEMINI_API_KEY is left blank, the AI Lab operates in simulated keyword fallback mode automatically.)*
3. Install dependencies and start:
   ```bash
   cd server
   npm install
   npm run dev
   ```

### 3. Frontend Configuration
1. Open the `client/` directory.
2. Verify `client/.env` has the correct backend path:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Install dependencies and start the Vite development server:
   ```bash
   cd client
   npm install
   npm run dev
   ```

---

## 🔑 Administrator Portal Credentials

When the backend runs for the first time, it auto-verifies if the `users` table is empty. If it is, it generates a default administrator account automatically.
- **Login Email**: `admin@chunchun.dev`
- **Login Password**: `admin123`

You can sign in by navigating to `http://localhost:5173/admin/login` on the client application. The dashboard supports adding, editing, or deleting projects, experience logs, skills, certifications, and achievements, as well as viewing client contact submissions and AI query logs.

---

## 🤖 AI Lab Prompt Engineering & Safety
The Gemini assistant is restricted through system prompts containing Chunchun's specific resume credentials. 
- **Out of Scope Safeguard**: If questions are asked about topics unrelated to Chunchun (e.g. general code, cooking, history), the AI replies with: *"I can answer questions related to Chunchun's portfolio, projects, skills, experience and technical background."*
- **Information Not Available Safeguard**: If details are queried that do not exist in the prompt context, the AI replies with: *"I don't have that information in Chunchun's portfolio."*
- **Ethics Guarantee**: The AI Hospital Management System case study clarifies that the chatbot provides general navigation help and **never** diagnoses medical conditions.

---

## 🌐 API Playground documentation
The interactive **API Playground** is accessible at `/playground` (e.g. `http://localhost:5173/playground`).

| HTTP Method | API Path | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Public | Verify credentials and return signed JWT |
| **GET** | `/api/auth/profile` | Admin | Get current admin user from JWT session |
| **GET** | `/api/projects` | Public | Fetch all projects (Featured filters available) |
| **GET** | `/api/projects/:idOrSlug` | Public | Fetch single project by ID or Slug string |
| **POST** | `/api/projects` | Admin | Create project (Requires JWT and validation schemas) |
| **PUT** | `/api/projects/:id` | Admin | Update project by ID |
| **DELETE** | `/api/projects/:id` | Admin | Delete project by ID |
| **GET** | `/api/experience` | Public | Fetch experiences timeline list |
| **POST** | `/api/contact` | Public | Submit contact messages (Rate-limited, saves to DB) |
| **POST** | `/api/ai/chat` | Public | Submit visitor chat. Passes prompts to Gemini |
=======
# 🌐 Chunchun Kumar Singh - Portfolio Website

A modern, responsive, and animated developer portfolio built using **React.js** and **Tailwind CSS**.  
This portfolio showcases my **skills, projects, experience, and education** as a Full Stack Developer.

## 🚀 Live Demo
🔗 [View Portfolio](https://portfolio-five-flax-95.vercel.app/)


## 🛠️ Tech Stack

- ⚛️ React.js
- 🎨 Tailwind CSS
- 💾 Vercel(for deployment)

## 📁 Features

- Responsive design for all screen sizes 📱💻
- Smooth scrolling navigation ✨
- Animated UI components 🎨
- Typing animation hero section ⌨️
- Tilt profile image effect 🧊
- Projects showcase section 👨‍💻
- Skills and experience timeline 📊
- Social media integration 🔗


## 🧑‍💻 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/CHUNCHUNKUMARSINGH9693/Chunchun-Portfolio.git
cd Chunchun-Portfolio
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```
>>>>>>> 3fe99007bc55cea4d14d6632bcec011f9c5ebbe7
