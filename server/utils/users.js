class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {
      id,
      name,
      room
    };
    this.users.push(user);
    console.log(this.users)
    return user;
  }

  removeUser(id) {
    let user;
    const index = this.users.findIndex(user => user.id === id)
    if (index > -1) {
      user = this.users[index];
      this.users.splice(index, 1);
    }
    return user;
  }

  getUser(id) {
    const users = this.users.filter(user => user.id === id);
    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  getUserList(room) {
    const filteredUsers = this.users.filter(user => user.room === room)
    const userNames = filteredUsers.map(user => user.name);
    return userNames;
  }
}

module.exports = {
  Users
};