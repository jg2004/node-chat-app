const expect = require('expect');
const {
  Users
} = require('./users');


describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      }, {
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      }
    ]
  })
  it('should add new user', () => {

    const users = new Users();
    const user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    const resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user]);
  });

  it('should remove user by id', () => {

    const userToDelete = users.users[0];
    const resUser = users.removeUser('1');
    expect(resUser).toEqual(userToDelete)
  })

  it('should return names for node course', () => {
    const userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie'])
  })

  it('should return names for React course', () => {
    const userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen'])
  })

  it('should not remove user', () => {

    const resUser = users.removeUser('5');
    expect(resUser).toBeFalsy();
  })

  it('should find user', () => {

    const user = users.getUser('2');
    expect(user).toEqual(users.users[1])
  })

  it('should not find a user', () => {

    const user = users.getUser('5');
    expect(user).toBeFalsy();
  })

})