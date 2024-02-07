
const { Router } = require('express');
const router = Router();
const Message = require('../models/Message');



router.get('/messages', async (req, res) => {
    try {
     
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ error: 'An error occurred while fetching chat messages' });
    }
});

router.post('/messages', async (req, res) => {
    try {
        const { sender, content } = req.body;

        const newMessage = new Message({ sender, content });
        await newMessage.save();

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending chat message:', error);
        res.status(500).json({ error: 'An error occurred while sending chat message' });
    }
});

module.exports = router;
