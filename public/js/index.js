const socket = io();
socket.on('connect', function () {
  console.log('connected to server')
})

socket.on('newMessage', (message) => {
  console.log('newMessage', message)

  const li = document.createElement('li');
  li.textContent = `${message.from}: ${message.text}`
  messages.appendChild(li)
})

socket.on('newUserMessage', (message) => {
  console.log(message)
})
socket.on('disconnect', function () {
  console.log('Disconnected from server');})


const form = document.getElementById('message-form');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: document.getElementById('form-input').value
  }, () => {
    console.log('got it')

  })
})