const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('../routes/auth');
const invoiceRoutes = require('../routes/invoice');

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://invoice-generator-neon-two.vercel.app'
    : 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use(express.json());

// MongoDB connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Connect to DB before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoice', invoiceRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Invoice Generator API is running!' });
});

module.exports = app;