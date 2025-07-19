# PMS Backend (MERN)

This is the backend for the Project Management System (PMS), built with Node.js, Express, and MongoDB Atlas. It provides RESTful APIs for projects, tasks, teams, files, notifications, and user authentication (JWT).

## Features
- User authentication (register, login, JWT)
- CRUD for Projects, Tasks, Teams
- File upload and management
- Notifications
- MongoDB Atlas integration
- Professional structure and best practices

## Getting Started
1. Clone the repo and run `npm install`.
2. Create a `.env` file with your MongoDB Atlas URI:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```
3. Start the server:
   ```
   npx nodemon server.js
   ```

## Folder Structure
- `models/` - Mongoose models
- `routes/` - Express route handlers
- `controllers/` - Business logic
- `middleware/` - Auth, error handling, etc.
- `uploads/` - Uploaded files

## API Endpoints
- `/api/auth` - Register, login
- `/api/projects` - Project CRUD
- `/api/tasks` - Task CRUD
- `/api/teams` - Team CRUD
- `/api/files` - File upload/list/delete
- `/api/notifications` - Notifications

---

For full-stack integration, connect this backend to your React/MUI frontend.
