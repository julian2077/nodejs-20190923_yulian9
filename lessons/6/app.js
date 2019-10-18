const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config');
const passport = require('./libs/passport');
const {login} = require('./controllers/login');

const app = new Koa();
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

const router = new Router({prefix: '/api'});

router.post('/login', login);

router.get('/login/:provider', async (ctx, next) => {
  const provider = ctx.params.provider;
  await passport.authenticate(provider, config.providers[provider].options)(ctx, next);
});

router.get('/login/:provider/callback', async (ctx, next) => {
  const provider = ctx.params.provider;
  await passport.authenticate(provider, async (err, user, info) => {
    if (err) throw err;
  
    if (!user) ctx.throw(400, info);
  
    ctx.body = 'all good!';
  })(ctx, next);
});

const sessions = require('./sessions');
router.get('/me', async (ctx, next) => {
  const {token} = ctx.query;
  if (!token) ctx.throw(400, 'no token!');
  if (!sessions[token]) ctx.throw(400, 'invalid token!');
  
  ctx.body = sessions[token];
});

app.use(router.routes());

module.exports = app;
