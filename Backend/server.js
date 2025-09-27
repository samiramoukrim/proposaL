// استدعاء المكتبات المطلوبة
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// PORT
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Import Routes
const userRoutes = require('./routes/users');
const serviceRoutes = require('./routes/services');

// مثال على route رئيسي
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Backend API!',
    status: 'Server is running successfully',
    endpoints: {
      users: '/api/users',
      services: '/api/services',
      portfolio: '/api/portfolio',
      contact: '/api/contact'
    }
  });
});

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);

// مثال على route Portfolio
app.get('/api/portfolio', (req, res) => {
  const portfolio = [
    { id: 1, image: "https://i.pinimg.com/1200x/34/9c/96/349c9664cabe53995188b9d5955b69fe.jpg" },
    { id: 2, image: "https://i.pinimg.com/736x/75/80/b0/7580b0efebdbb2c546e0eeb38d53e0f3.jpg" },
  ];
  res.json(portfolio);
});

// مثال على route Contact (POST)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("New contact message:", { name, email, message });
  res.json({ status: 'success', message: 'Message received!' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
