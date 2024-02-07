
const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
router.post('/signup', async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, firstname, lastname, password });
        await newUser.save();

        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'An error occurred while signing up' });
    }
});

router.post('/login', async (req, res) => {
    try {
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});


router.post('/logout', async (req, res) => {
    try {
        
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'An error occurred while logging out' });
    }
});

module.exports = router;
