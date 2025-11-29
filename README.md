# Fullstack Employee Management App

This project is a **Fullstack Employee Management Application** built with **React** (frontend) and **Node.js/Express** (backend), served using **Nginx** inside Docker containers.  
The app allows users to:

- Signup. login
- Add, update, and delete employees
- Upload employee profile pictures
- Search employees by department or position

The backend APIs are proxied by Nginx.

---

## 🏗️ Project Structure

project-root/
│
├─ backend/ # Node.js backend
│ ├─ index.js
│ ├─ package.json
│ └─ .env
│
├─ frontend/ # React frontend
│ ├─ src/
│ ├─ public/
│ ├─ build/ # Generated after npm run build
│ ├─ nginx/ # Contains Nginx config default.conf
│ ├─ package.json
│ └─ Dockerfile
│
├─ docker-compose.yml
└─ README.md


---

## ⚡ Prerequisites

- Docker Desktop (Windows/Mac/Linux)
- Docker Compose
- Node.js (for local development if needed)

---

## 🐳 Docker Setup

The project uses Docker Compose to run **3 services**:

1. **backend** – Node.js/Express API (port 5000)  
2. **frontend/nginx** – React build served via Nginx (port 80)  
3. **network** – Docker Compose network ensures communication between containers  

---

### 🔧 Step 1: Build & Run

From the project root:

```bash
docker-compose up --build
```

### ⚡ Step 2: Access the App

Open your browser: http://localhost:3000

All frontend routes are handled by React SPA

### 🛠️ Development Notes

Frontend Development:
```bash
cd frontend
npm install
npm start
```
Backend Development:
```bash
cd backend
npm install
node index.js
```

During local development, you can run frontend on localhost:3000 and backend on localhost:5000.
In Docker, Nginx proxies backend requests automatically.

## 📌 Author
Nhu Ly - https://github.com/nhunique/