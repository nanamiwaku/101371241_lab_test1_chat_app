const mongoose = require('mongoose'); 
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const path = require('path'); // pathモジュールのインポート


// MongoDB URI - 秘密の情報は.envファイルに移動させるべきですが、一旦ここに記述します。
const uri = 'mongodb+srv://nanamiwaku:PkkJdfZQiBTPejEu@cluster0.bzf8vmp.mongodb.net/comp3133_labtest1?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => console.log('Conected to MongoDBに接続しました'))
  .catch(err => console.error('Failed to conected MongoDB', err));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// auth.jsからのルートを使用する
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

const PORT = process.env.PORT || 5054;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`ポート ${PORT} は既に使用されています。別のポートを使用するか、そのポートを使用しているプロセスを終了してください。`);
  } else {
    console.log(`サーバー起動時にエラーが発生しました: ${e.message}`);
  }
});
