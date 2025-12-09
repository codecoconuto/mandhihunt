
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// 1. Client Key Protection
exports.requireClientKey = (req, res, next) => {
  const apiKey = req.headers['x-client-id'];
  if (!apiKey || apiKey !== config.clientApiKey) {
    if (process.env.NODE_ENV === 'development') return next(); 
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid or missing Client API Key'
    });
  }
  next();
};

// 2. Protect Routes
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in!'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token.'
    });
  }
};

// 3. Restrict To Roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};
