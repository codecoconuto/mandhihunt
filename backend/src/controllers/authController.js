
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// MOCK USER STORE (Replace with DB in Production)
const users = [
    { id: 1, name: "Admin User", email: "admin@mandihunt.com", password: "admin123", role: "admin" },
    { id: 2, name: "Regular User", email: "user@mandihunt.com", password: "user123", role: "user" }
]; 

const signToken = (id, role) => {
    return jwt.sign({ id, role }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });
};

exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({message: "Provide email and password"});

    // Hardcoded mock registration
    const newUser = { id: users.length + 1, email, role: 'user' };
    users.push(newUser);

    const token = signToken(newUser.id, newUser.role);
    
    res.status(201).json({
        status: 'success',
        token,
        data: { user: newUser }
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    // 1. Check if email and password exist
    if(!email || !password) {
        return res.status(400).json({ status: 'fail', message: "Provide email and password" });
    }

    // 2. Check if user exists & password is correct
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    // 3. Send token
    const token = signToken(user.id, user.role);

    // Remove password from output
    const { password: _, ...userSafe } = user;

    res.status(200).json({
        status: 'success',
        token,
        data: { user: userSafe }
    });
};
