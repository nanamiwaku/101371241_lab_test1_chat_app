
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



const User = require('../models/User'); 
router.post('/signup', async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = new User({ username, firstname, lastname, password: hashedPassword });
        
        await newUser.save();

        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: error.message || 'An error occurred while signing up' });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});


router.post('/logout', (req, res) => {
    
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'An error occurred while logging out' });
        }

        res.clearCookie('connect.sid'); 

        
        res.status(200).json({ message: 'Logout successful' });
    });
});


module.exports = router;
