
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path'); // Import Path
const globalErrorHandler = require('./middleware/errorHandler');
const routes = require('./routes/v1');
const logger = require('./utils/logger');

const app = express();

// 1) GLOBAL MIDDLEWARE

// Set security HTTP headers
// FIX: Allow cross-origin resources (images) to be loaded
app.use(helmet({
  contentSecurityPolicy: false, // Disable strict CSP for map tiles/images
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 300, // Limit each IP to 300 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Cross-Origin Resource Sharing
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-id']
}));

// 2) API ROUTES
app.use('/api/v1', routes);

// 3) SERVE FRONTEND IN PRODUCTION
// This block checks if we are running in production. If so, it serves the React app.
if (process.env.NODE_ENV === 'production') {
  // Point to the frontend/dist folder
  const frontendPath = path.join(__dirname, '../../../frontend/dist');
  
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// 4) HEALTH CHECK
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'MandiHunt API is Online' });
});

// 5) ERROR HANDLING
app.use(globalErrorHandler);

module.exports = app;
