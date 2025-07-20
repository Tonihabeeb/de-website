# Deep Engineering Backend

This is the custom Node.js/Express backend for the Deep Engineering website. It provides full control over document management, dashboards, authentication, access control, and audit logging.

## Stack
- Node.js + Express.js
- TypeScript
- MongoDB (recommended, can swap for PostgreSQL)
- JWT authentication
- Multer (file uploads)
- dotenv (environment variables)

## Project Structure
```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── app.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your secrets
4. `npm run dev` to start the development server

## Features
- User authentication & roles
- Document CRUD, upload, versioning, permissions
- Project, financial, environmental, stakeholder dashboards
- Audit logging
- Secure, scalable, and extensible 