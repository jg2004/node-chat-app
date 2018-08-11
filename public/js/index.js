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

socket.on('newLocationMessage', function (message) {

  const listElement = document.createElement('li');
  const link = document.createElement('a')
  listElement.textContent = `${message.from}: `;
  link.setAttribute('href', message.url);
  link.setAttribute('target', '_blank');
  link.textContent = 'My current location';
  listElement.appendChild(link);
  messages.appendChild(listElement);
})

socket.on('newUserMessage', (message) => {
  console.log(message)
})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})


const form = document.getElementById('message-form');
const messages = document.getElementById('messages');
const locationButton = document.getElementById('send-location');

locationButton.addEventListener('click', (e) => {

  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.setAttribute('disabled', true);
  locationButton.textContent = 'Sending Location...';

  navigator.geolocation.getCurrentPosition((position) => {

    locationButton.removeAttribute('disabled');
    locationButton.textContent = 'Send Location';
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, () => {
    alert('Unable to fetch location.')
    locationButton.removeAttribute('disabled');
    locationButton.textContent = 'Send Location';
  })
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formInput = document.getElementById('form-input');

  socket.emit('createMessage', {
    from: 'User',
    text: formInput.value
  }, () => {
    console.log('got it');
    formInput.value = '';
  })
  formInput.value = 'Waiting for server to acknowledge...'
})