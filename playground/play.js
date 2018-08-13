const users = [];
const user1 = {
  id: '1',
  name: 'jer',
  room: 'A'
}
const user2 = {
  id: '2',
  name: 'jon',
  room: 'B'
}
const user3 = {
  id: '3',
  name: 'mark',
  room: 'C'
}
const user4 = {
  id: '4',
  name: 'ang',
  room: 'A'
}

users.push(user1)
users.push(user2)
users.push(user3)
users.push(user4)

const room = 'A';

const filteredUsers = users.filter(user => user.room === room)
console.log('filteredUsers', filteredUsers);

const userNames = filteredUsers.map((user) => {

  return user.name
});
console.log(userNames);