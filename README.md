# 🏠 Malaika House Project

The **Malaika House Project** is a full-stack web platform designed to support the operations of **Malaika House** — an inclusive education and family-support organization for neurodivergent learners.  
It provides an **admin management dashboard**, **parent portal**, **public website**, and **secure backend APIs**.

Built with **React + JavaScript (frontend) + TypeScript(backend) (Vite)** with **Express + Prisma + SQL Server**

---

## 🌍 Overview

The platform consists of two major components:

- **Frontend (`/frontend`)**  
  A modern, responsive web interface for both the **public site** (Our Story, Book a Visit, Contact Us, etc.) and **authenticated dashboards** (Admin, Parent, Partner, Staff).  
  Built with **React**, **Tailwind CSS**, and **Vite** for performance and modular structure.

- **Backend (`/backend`)**  
  A secure REST API built with **Express**, connected to a **SQL Server** database using **Prisma ORM**.  
  Handles authentication, session management, email notifications, activity logs, and data CRUD operations.

---

## ⚙️ Core Functionality

### 🔐 Authentication
- JWT-based secure login system.
- Passwords hashed with **Argon2id** and salted.
- Role-based access control for:
  - **Admin**
  - **Parent**
  - **Partner**
  - **Staff**
- Uses secure cookies for session persistence.

### 🧾 Admin Dashboard
- User management (add, edit, enable/disable users)
- Activity logging (records key actions)
- Analytics overview and modular content sections
- Notifications and role editing

### 👪 Parent Dashboard
- Personalized view for parents
- Child information and reports
- Payments and visit scheduling
- Account settings (profile updates, contact info)

### 🏫 Public Website
- Informational pages:
  - Home, What We Offer, Our Story, Staff & Supporters
- Functional forms:
  - **Book a Visit** — schedules an on-site or online visit and sends confirmation emails to both admin and user.
  - **Contact Us** — sends inquiries directly to the Malaika House admin email.
- Accessibility tools for font size, contrast, and text-to-speech (reusable component).

---

## 🧰 Tech Stack

| Layer | Technologies |
| **Frontend** | React (Vite), TypeScript, Tailwind CSS, React Router 
| **Backend** | Node.js, Express, Prisma ORM 
| **Database** | SQL Server 
| **Auth** | JWT + Argon2id 
| **Email** | Nodemailer (SMTP) 
| **Environment Management** | dotenv 
| **Development Tools** | ESLint, Prettier, Concurrently 

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

Clone the repository, then install packages for both backend and frontend:

```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install

# Then Run

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed the database with initial data
npx prisma db seed

# Then youll need two terminals open
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Access the app
Frontend: http://localhost:5173
BackendAPI: http://localhost:5000

# When you create a new user in the admin dashboard the password reset email link will be generated and displayed in the backend terminal where you started the APIs.

## LOGINS ##

# admin@malaikahouse.co.za | Admin123!
# parent@malaikahouse.co.za | Parent123!
# partner@malaikahouse.co.za | Partner123!
