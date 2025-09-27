const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const serviceRoutes = require('./routes/services');
const userRoutes = require('./routes/users');
const reservationRoutes = require('./routes/reservations');
const contactRoutes = require('./routes/contact');

const app = express();

// =======================
// CORS Middleware
// =======================
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // allow cookies/authorization headers
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept','Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));




// =======================
// Body parsers
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Routes
// =======================
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/contact', contactRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Backend API!',
    status: 'Server is running',
    endpoints: {
      users: '/api/users',
      services: '/api/services',
      reservations: '/api/reservations',
      contact: '/api/contact'
    }
  });
});

// =======================
// MongoDB Connection
// =======================
mongoose.connect(
  "mongodb+srv://samiramoukrim823_db_user:code2005@cluster0.yakhixg.mongodb.net/proposal_planning?retryWrites=true&w=majority&appName=Cluster0",
  { serverSelectionTimeoutMS: 5000, socketTimeoutMS: 45000 }
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  }).on('error', (err) => {
    console.error('❌ Server error:', err);
  });
  
