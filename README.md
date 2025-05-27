# 🧩 Fullstack User Management App

A microservice-based CRUD application using:

- **Frontend**: Next.js (`frontend/`)
- **Backend**: Node.js/Express (`user-service/`)
- **Database**: MySQL
- **Containerization**: Docker + Docker Compose

---

## 📂 Project Structure

.
├── docker-compose.yml               # Docker orchestration
├── README.md                        # Project documentation

├── frontend/                        # Next.js frontend
│   ├── .next/                       # Next.js build output (auto-generated)
│   ├── node_modules/                # Frontend dependencies
│   ├── public/                      # Static assets
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── vendor/
│   │   ├── favicon.png
│   │   └── robots.txt
│   ├── src/                         # Application source
│   │   ├── action/
│   │   │   └── user/                # API call functions (e.g., CRUD methods)
│   │   ├── components/
│   │   │   └── user/                # Reusable UI components (form, list, detail)
│   │   │       ├── Form.js
│   │   │       ├── List.js
│   │   │       ├── Details.js
│   │   │       ├── UserManagementComponent.js
│   │   │       └── UserManagementComponent.module.css
│   │   ├── pages/                   # Next.js routing pages
│   │   │   ├── _app.js
│   │   │   ├── _document.js
│   │   │   ├── index.js             # Home page
│   │   │   └── _error.js
│   │   ├── styles/                  # Custom/global styles
│   │   │   ├── bootstrap.css
│   │   │   ├── global.css
│   │   │   └── style.css
│   │   ├── utils/                   # Constants, helper functions
│   │   │   ├── constants.js
│   │   │   └── utils.js
│   ├── .env                         # Frontend environment variables (if any)
│   ├── jsconfig.json                # Module path aliasing
│   ├── next.config.js               # Next.js config
│   ├── package.json
│   └── package-lock.json

├── user-service/                    # Backend service (Node.js + Express)
│   ├── node_modules/                # Backend dependencies
│   ├── src/
│   │   ├── v1/api/controller/       # API controllers (e.g., user CRUD)
│   │   │   └── userManagement.js
│   │   ├── routes/                  # API route definitions
│   │   │   └── index.js
│   │   ├── utils/                   # DB helpers, error handlers
│   │   │   ├── dbHelper.js
│   │   │   ├── error.js
│   │   │   └── constants.js
│   │   ├── config.js                # Configuration like DB connection
│   │   ├── server.js                # Express app entry point
│   │   └── serviceResponse.js       # Response wrapper
│   ├── .env                         # Backend environment variables
│   ├── package.json
│   └── package-lock.json




---

## 🚀 Running the Project

### Prerequisites

- Docker
- Docker Compose

### 1. Clone the Repo

git clone https://github.com/yourusername/user-management-app.git
cd user-management-app
