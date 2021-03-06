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
  generateMessage,
  generateLocationMessage
} = require('./utils/message')
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const users = new Users();

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {

    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //To leave a room: socket.leave('Name of room')
    //To broacast to everyone in room: io.to('Name of Room').emit
    //To broadcast to everyone in room: socket.broadcast.to('Name of room').emit
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined the chat`))
    callback();
  })

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
    }
    callback();
  })

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  })

  socket.on('disconnect', () => {
    console.log('client disconnected')
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})