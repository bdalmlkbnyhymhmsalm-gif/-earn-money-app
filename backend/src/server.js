/**
 * 🌍 Global Shopping & Earning App
 * Main Server Entry Point
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketIO = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const gameRoutes = require('./routes/games');
const surveyRoutes = require('./routes/surveys');
const walletRoutes = require('./routes/wallet');
const paymentRoutes = require('./routes/payments');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Initialize Express App
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// ==================== SECURITY MIDDLEWARE ====================
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ==================== LOGGING MIDDLEWARE ====================
app.use(logger);

// ==================== DATABASE CONNECTION ====================
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// ==================== ROUTES ====================

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: '🌍 Global Shopping & Earning App - Server is Running'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/payments', paymentRoutes);

// ==================== WEBSOCKET REAL-TIME EVENTS ====================

io.on('connection', (socket) => {
  console.log(`👤 User connected: ${socket.id}`);

  // Real-time notifications
  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
  });

  // Game notifications
  socket.on('game-completed', (data) => {
    io.to(`user-${data.userId}`).emit('game-reward', data);
  });

  // Survey notifications
  socket.on('survey-available', (data) => {
    io.to(`user-${data.userId}`).emit('new-survey', data);
  });

  // Order updates
  socket.on('order-update', (data) => {
    io.to(`user-${data.userId}`).emit('order-status', data);
  });

  socket.on('disconnect', () => {
    console.log(`👋 User disconnected: ${socket.id}`);
  });
});

// ==================== ERROR HANDLING ====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '❌ Route Not Found'
  });
});

app.use(errorHandler);

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  🌍 Global Shopping & Earning App - Backend Server     ║
║  ✅ Server Running on Port: ${PORT}                       ║
║  📊 Environment: ${process.env.NODE_ENV || 'development'}                  ║
║  🔗 API URL: ${process.env.API_URL || 'http://localhost:5000'}           ║
╚════════════════════════════════════════════════════════╝
  `);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('📭 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    mongoose.connection.close();
    process.exit(0);
  });
});

module.exports = { app, server, io };
