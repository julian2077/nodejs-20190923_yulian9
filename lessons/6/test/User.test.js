const mongoose = require('mongoose');
const User = require('../models/User');
const {expect} = require('chai');

describe('User model', () => {
  before(async () => {
    await User.deleteMany();
  });
  
  after(() => {
    mongoose.disconnect();
  });
  
  it('should save hash and salt', async () => {
    const u = new User({
      email: 'user@mail.com',
      displayName: 'user',
    });
    await u.setPassword('password');
    await u.save();
    
    const document = await User.findOne({email: 'user@mail.com'});
    expect(document.salt).to.not.be.undefined;
    expect(document.passwordHash).to.not.be.undefined;
  });
  
  it('should compare users', async () => {
    const user = await User.findOne({email: 'user@mail.com'});
    const invalidPassword = await user.checkPassword('password1');
    expect(invalidPassword).to.equal(false);
    
    const validPassword = await user.checkPassword('password');
    expect(validPassword).to.equal(true);
  });
});
