const expect = require('expect');

const {
  generateMessage
} = require('./message');


describe('generateMessage', () => {

  it('should generate the correct message object', () => {


    const message = {
      from: 'Admin',
      text: 'text'
    }

    const response = generateMessage(message.from, message.text);

    expect(response).toMatchObject({
      from: message.from,
      text: message.text
    });
    expect(response.from).toBe(message.from);
    expect(response.text).toBe(message.text);
    expect(typeof response.createdAt).toBe('number');
  })

})