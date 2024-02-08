const mongoose = require('mongoose'); 
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
//const User = require('./models/User');
const authRoutes = require('./routes/auth');
const path = require('path'); 



const uri = 'mongodb+srv://nanamiwaku:PkkJdfZQiBTPejEu@cluster0.bzf8vmp.mongodb.net/comp3133_labtest1?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => console.log('Conected to MongoDB'))
  .catch(err => console.error('Failed to conected MongoDB', err));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
});


app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});



io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });         
});

const PORT = process.env.PORT || 8084;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} it's already used. use other port `);
  } else {
    console.log(`server error: ${e.message}`);
  }
});
