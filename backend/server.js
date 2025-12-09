require('dotenv').config();
const app = require('./src/app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

// --- STARTUP CHECK ---
const checkEnv = () => {
  const missing = [];
  if (!process.env.GOOGLE_MAPS_API_KEY) missing.push("GOOGLE_MAPS_API_KEY");
  if (!process.env.GEMINI_API_KEY) missing.push("GEMINI_API_KEY");
  
  if (missing.length > 0) {
    logger.error("❌ MISSING API KEYS IN backend/.env FILE:");
    missing.forEach(key => logger.error(`   - ${key}`));
    logger.error("Please create a .env file in the backend folder and add these keys.");
    process.exit(1);
  }
};

checkEnv();

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`🔑 API Keys loaded successfully`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  logger.error(`UNHANDLED REJECTION! 💥 Shutting down...`);
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});