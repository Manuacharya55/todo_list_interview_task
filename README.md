# TaskFlow — Clean MERN Stack Todo Application

A modern, production-grade full-stack Todo application built with the **MERN** stack (MongoDB, Express, React, Node.js). Engineered with a robust MVC backend, clean component-driven frontend architecture, and a minimal shadcn-inspired user interface.

🚀 **Live Preview:** [https://todo-list-interview-task.vercel.app](https://todo-list-interview-task.vercel.app/)

---

## 📑 Table of Contents

- [🚀 Live Preview](#-live-preview)
- [🏛 Architecture Overview](#-architecture-overview)
- [📂 Directory Structure](#-directory-structure)
- [⚡ API Routes](#-api-routes)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Installation & Quick Start](#-installation--quick-start)
- [🔒 Environment Variables](#-environment-variables)

---

## 🏛 Architecture Overview

### Backend (MVC Pattern)
- **Routes (`server/src/routes/`)**: Maps REST endpoints to controllers with request validation middleware.
- **Controllers (`server/src/controllers/`)**: Handles business logic wrapped in `asyncHandler` for clean error propagation.
- **Models (`server/src/models/`)**: Mongoose schema for Todos (`title`, `description`, `completed`, timestamps).
- **Middleware & Utils (`server/src/middleware/`, `server/src/utils/`)**: Input validation, custom `ApiError` hierarchy, standardized `ApiSuccess` responses, and centralized `globalErrorHandler`.

### Frontend
- **State Management (`client/src/context/`)**: Global `TodoContext` for state management and Axios HTTP requests with optimistic toggle updates.
- **Form Handling**: React Hook Form integrated with client-side Zod validation.
- **Components (`client/src/components/`, `client/src/pages/`)**: Modular, accessible, shadcn-inspired UI components (`Button`, `Input`, `Modal`, `TodoItem`, `TodoForm`).

---

## 📂 Directory Structure

```
TODO LIST/
├── server/                               # Express.js & Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                     # MongoDB connection using Mongoose
│   │   ├── controllers/
│   │   │   └── todo.controller.js        # Controller with CRUD & toggle logic
│   │   ├── middleware/
│   │   │   └── validate.middleware.js    # Express middleware executing Zod schema validation
│   │   ├── models/
│   │   │   └── todo.model.js             # Mongoose Todo schema & model definition
│   │   ├── routes/
│   │   │   └── todo.routes.js            # REST route declarations & middleware bindings
│   │   ├── utils/
│   │   │   ├── ApiError.js               # ApiError base class & error subclasses
│   │   │   ├── ApiResponse.js            # ApiSuccess standardized response builder
│   │   │   ├── asyncHandler.js           # Async controller wrapper for centralized errors
│   │   │   └── errorHandler.js           # Global Express error-handling middleware
│   │   ├── validators/
│   │   │   └── todo.validator.js         # Zod validation schema for task payloads
│   │   ├── app.js                        # Express application setup (CORS, Morgan, middleware)
│   │   └── server.js                     # Database bootstrap & HTTP server listener
│   ├── .env                              # Environment configuration (ignored in git)
│   ├── .env.example                      # Template for environment variables
│   ├── package-lock.json                 # Pinned server dependency tree
│   └── package.json                      # Server scripts & dependencies
│
├── client/                               # React 19 & Vite Frontend
│   ├── src/
│   │   ├── components/                   # Reusable UI component library (shadcn-inspired)
│   │   │   ├── Button.jsx                # Multi-variant button component (default, outline, ghost)
│   │   │   ├── Input.jsx                 # forwardRef input field with label & validation errors
│   │   │   ├── Modal.jsx                 # Accessible backdrop & dialog portal modal
│   │   │   ├── TodoForm.jsx              # Reusable task creation & editing form
│   │   │   └── TodoItem.jsx              # Todo card with toggle checkbox, edit & delete buttons
│   │   ├── context/
│   │   │   └── TodoContext.jsx           # React Context for global state, Axios calls & optimistic UI
│   │   ├── pages/                        # Page views
│   │   │   ├── TodoContainer.jsx         # Stateful container: React Hook Form & action handlers
│   │   │   ├── TodoPresenter.jsx         # Stateless presenter: layout, skeleton loader & modal render
│   │   │   └── TodoPage.jsx              # Page root component mounting TodoContainer
│   │   ├── validators/
│   │   │   └── todoForm.validator.js     # Zod schema for client-side form validation
│   │   ├── App.jsx                       # Root application component wrapped in TodoProvider
│   │   ├── index.css                     # Modern CSS design system (shadcn flat palette & tokens)
│   │   └── main.jsx                      # React DOM entry point
│   ├── .gitignore                        # Git ignore patterns for client
│   ├── .oxlintrc.json                    # Oxlint linter configuration
│   ├── index.html                        # HTML5 document template
│   ├── package-lock.json                 # Pinned client dependency tree
│   ├── package.json                      # Client dependencies & scripts
│   └── vite.config.js                    # Vite build & plugin configuration
│
└── README.md                             # Project documentation
```

---

## ⚡ API Routes

Base URL: `/api/todos`

| Method | Endpoint | Description | Request Body | Status Codes |
|---|---|---|---|---|
| `GET` | `/api/todos` | Retrieve all tasks (sorted newest first) | — | `200`, `500` |
| `POST` | `/api/todos` | Create a new task | `{ title, description? }` | `201`, `422`, `500` |
| `GET` | `/api/todos/:id` | Retrieve single task by ID | — | `200`, `404`, `500` |
| `PATCH` | `/api/todos/:id` | Update task details | `{ title?, description?, completed? }` | `200`, `404`, `422`, `500` |
| `PATCH` | `/api/todos/:id/toggle` | Toggle task completion status | — | `200`, `404`, `500` |
| `DELETE` | `/api/todos/:id` | Delete task by ID | — | `200`, `404`, `500` |

---

## 🛠 Tech Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Backend Runtime** | Node.js | Server-side JavaScript runtime |
| **Backend Framework** | Express.js 4 | RESTful API routing and middleware pipeline |
| **Database & ODM** | MongoDB, Mongoose 8 | Document database and object data modeling |
| **Data Validation** | Zod 3 | Runtime schema validation (server and client) |
| **Frontend Framework** | React 19 | Declarative UI rendering |
| **Build Tooling** | Vite 6 | Rapid HMR frontend dev server and production bundler |
| **State & HTTP** | React Context API, Axios | Global state management and asynchronous API calls |
| **Form Management** | React Hook Form | Form handling and validation |
| **Styling & Icons** | Vanilla CSS, Lucide React |  accessible components, and iconography |

---

## 🚀 Installation & Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI

### 1. Clone & Setup Backend
```bash
cd server
npm install
npm run dev
```
*Backend server runs at `http://localhost:5000`.*

### 2. Setup Frontend
```bash
cd client
npm install
npm run dev (for nodemon) or npm start (for running server)

```
*Frontend runs at `http://localhost:5173`.*

---

## 🔒 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Frontend (`client/.env` - optional)
```env
VITE_API_URL=http://localhost:5000/api/todos
```
