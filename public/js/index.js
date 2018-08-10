const socket = io();
socket.on('connect', function () {
  console.log('connected to server')
  })

socket.on('newMessage', (message) => {
  console.log('newMessage',message)
})

socket.on('newUserMessage',(message)=>{
  console.log(message)
})
socket.on('disconnect', function () {
  console.log('Disconnected from server');
})