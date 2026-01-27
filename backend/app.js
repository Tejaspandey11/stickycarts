require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const corsConfig = require('./config/cors');
const errorMiddleware = require('./middlewares/error.middleware');

// Import routes
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const cartItemRoutes = require('./routes/cartItem.routes');
const cartMessageRoutes = require('./routes/cartMessage.routes');
const paymentRoutes = require('./routes/payment.routes');

const app = express();

// Database connection
db.connect();

// Middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/messages', cartMessageRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
