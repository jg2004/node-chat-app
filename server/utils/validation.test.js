const expect = require('expect');
const {
  isRealString
} = require('./validation');


describe('test the isRealString method', () => {

  it('should return false if empty string provided', () => {
    expect(isRealString('  ')).toBe(false);
  })

  it('should return false if non string provided', () => {
    expect(isRealString(99999)).toBe(false);
  })

  it('should return true if string provided', () => {
    expect(isRealString(' test ')).toBe(true);
  })

})