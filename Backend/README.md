# Backend API - MongoDB Express Application

## 📋 Overview
This is a Node.js backend application built with Express.js and MongoDB using Mongoose ODM. It provides RESTful API endpoints for managing users and services.

## 🚀 Features
- **Express.js** server with CORS support
- **MongoDB** database with **Mongoose** ODM
- **Environment variables** configuration with dotenv
- **Organized route structure** with separate route files
- **Data validation** with Mongoose schemas
- **Error handling** for API endpoints

## 📦 Dependencies
- `express` - Web framework for Node.js
- `mongoose` - MongoDB object modeling for Node.js
- `mongodb` - MongoDB driver
- `cors` - Cross-Origin Resource Sharing middleware
- `dotenv` - Environment variables loader
- `nodemon` - Development server with auto-restart

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   
   # Run index.js instead of server.js
   npm run dev-index
   ```

## 🌐 API Endpoints

### Base URL: `http://localhost:5000`

### Main Routes
- `GET /` - API information and available endpoints

### Users (`/api/users`)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Services (`/api/services`)
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Other Routes
- `GET /api/portfolio` - Get portfolio items
- `POST /api/contact` - Submit contact form

## 📁 Project Structure
```
Backend/
├── models/
│   ├── User.js          # User schema and model
│   └── Service.js       # Service schema and model
├── routes/
│   ├── users.js         # User routes
│   └── services.js      # Service routes
├── .env                 # Environment variables
├── server.js            # Main server file (organized)
├── index.js             # Alternative server file (simple)
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🗃️ Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  age: Number (0-120),
  createdAt: Date (default: now)
}
```

### Service Model
```javascript
{
  title: String (required),
  description: String,
  price: Number (min: 0),
  category: String (enum),
  isActive: Boolean (default: true),
  createdAt: Date (default: now)
}
```

## 🔧 Development

The server runs on port 5000 by default and connects to MongoDB using the connection string in your `.env` file.

### Available Scripts:
- `npm run dev` - Start development server with nodemon (server.js)
- `npm run dev-index` - Start development server with nodemon (index.js)
- `npm start` - Start production server (server.js)

## 📝 Notes
- Make sure MongoDB is running and accessible
- The server includes CORS configuration for frontend integration
- All routes include proper error handling and validation
- Environment variables are used for configuration management
