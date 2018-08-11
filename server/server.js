const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000
app.use(express.static(publicPath))
const server = http.createServer(app);
const io = socketIO(server);
const {
  generateMessage,generateLocationMessage
} = require('./utils/message')

io.on('connection', (socket) => {
  console.log('New user connected')
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user just joined the chat'))
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback();
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })
  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})