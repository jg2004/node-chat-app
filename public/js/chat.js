const socket = io();
socket.on('connect', function () {

  const params = getParams();

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error, yay')
    }
  })
})

socket.on('newMessage', (message) => {
  messages.appendChild(createMessageListItem(message));
  scrollToBottom();
})

socket.on('newLocationMessage', function (message) {
  messages.appendChild(createMessageListItem(message));
  scrollToBottom();
})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

socket.on('updateUserList', function (users) {
   const usersDiv =   document.getElementById('users');
  usersDiv.innerHTML='';
  const ol = document.createElement('ol');
  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user;
    ol.appendChild(li);
  })
  
  usersDiv.appendChild(ol);

})
/* DOM RELATED EVENTS */
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
    text: formInput.value
  }, () => {
    console.log('got it');
    formInput.value = '';
  })
  formInput.value = 'Waiting for server to acknowledge...'
})

function createMessageListItem(message) {

  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = document.createElement('li');
  li.classList.add('message');
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('message__title');
  const h4 = document.createElement('h4');
  h4.textContent = message.from;
  const span = document.createElement('span');
  span.textContent = formattedTime;
  titleDiv.appendChild(h4);
  titleDiv.appendChild(span);

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message__body');

  if (message.text) {
    const p = document.createElement('p');
    p.textContent = message.text;
    bodyDiv.appendChild(p);
  } else if (message.url) {

    const link = document.createElement('a')
    link.setAttribute('href', message.url);
    link.setAttribute('target', '_blank');
    link.textContent = 'My current location';
    bodyDiv.appendChild(link);
  }

  li.appendChild(titleDiv);
  li.appendChild(bodyDiv);
  return li;
}

function getParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    name: urlParams.get('name'),
    room: urlParams.get('room').toUpperCase()
  }
}

function scrollToBottom() {

  //Selectors
  const messages = document.getElementById('messages');
  const newMessage = messages.lastElementChild;
  const prevMessage = newMessage.previousElementSibling;

  //Heights
  const clientHeight = messages.clientHeight;
  const scrollTop = messages.scrollTop;
  const scrollHeight = messages.scrollHeight;
  const newMessageHeight = newMessage.clientHeight;
  let prevMessageHeight;
  if (prevMessage) {
    prevMessageHeight = prevMessage.clientHeight;
  } else {
    prevMessageHeight = 0;
  }

  if (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight) {
    console.log('should scroll');
    messages.scrollTop = scrollHeight;

  }
}