const expect = require('expect');

const {
  generateMessage,
  generateLocationMessage
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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {

    const from = 'Deb';
    const lat = 15;
    const lng = 19;
    const url = 'https://www.google.com/maps?q=15,19';
    const message = generateLocationMessage(from, lat, lng);

    expect(message).toMatchObject({
      from: from,
      url: url
    });
    expect(typeof message.createdAt).toBe('number');

  })
})