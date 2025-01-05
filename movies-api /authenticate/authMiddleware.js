import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../api/users/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            
            // Verify token
            const decoded = jwt.verify(token, process.env.SECRET);
            
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});