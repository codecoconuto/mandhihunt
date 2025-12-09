module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY,
  geminiKey: process.env.GEMINI_API_KEY,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientApiKey: process.env.CLIENT_API_KEY || 'dev-client-key'
};