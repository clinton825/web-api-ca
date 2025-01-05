import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { protect } from '../../authenticate/authMiddleware.js';
const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});


// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));


// Update a user
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;

        const result = await User.updateOne(
            { _id: req.params.id },
            req.body
        );

        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to Update User' });
        }
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});


// Delete User
router.delete('/:id', async (req, res)=> {
    const result = await User.deleteOne({
        _id: req.params.id,
    });
    if (result.deletedCount){
        res.status(200).json({code:200, msg: 'User Deleted Successfully'});
    }else {
        res.status(404).json({code: 404, msg:'Unable to find User'});
    }
});


async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

// post the user who is login
router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (user && (await user.comparePassword(password))) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: '30d'
        });
        
        res.json({
            _id: user._id,
            username: user.username,
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}));


// Logout user
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Get user profile
router.get('/me', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}));


export default router;
