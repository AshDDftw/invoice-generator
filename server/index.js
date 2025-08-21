const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const invoiceRoutes = require('./routes/invoice');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://invoice-generator-neon-two.vercel.app'
    : 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoice', invoiceRoutes);

// MongoDB connection (ensure it's reused in serverless)
let isConnected = false;
mongoose.connection.on("connected", () => {
  isConnected = true;
  console.log("MongoDB connected");
});

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
