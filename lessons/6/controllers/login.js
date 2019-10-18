const uuid = require('uuid/v4');
const passport = require('../libs/passport');
const sessions = require('../sessions');

module.exports.login = async function login(ctx, next) {
  await passport.authenticate('local', async (err, user, info) => {
    
    if (err) throw err;
    
    if (!user) ctx.throw(400, info);
    
    const token = uuid();
    
    ctx.body = token;
    
    sessions[token] = user;

  })(ctx, next);
};
