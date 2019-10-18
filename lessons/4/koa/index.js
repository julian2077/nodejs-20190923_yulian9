const Koa = require('koa');
const Router = require('koa-router');
const uuid = require('uuid/v4');
const app = new Koa();

/*
* POST /login (email, password) -> 200 OK token
*                               -> 400 email or password invalid
*
* GET /me                       -> {name, email}
*                               -> 401, 402
* */

const users = [{
  email: 'user1@mail.ru',
  name: 'User1',
  password: '123123',
  token: null,
}, {
  email: 'user2@mail.ru',
  name: 'User2',
  password: '123123',
  token: null,
}];

app.use(require('./bodyparser'));

const router = new Router();

router.post('/login', async (ctx, next) => {
  const {email, password} = ctx.request.body;
  if (!email || !password) ctx.throw(400, 'no email or password'); // ***

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) ctx.throw(400, 'email or password invalid');

  const token = uuid();
  user.token = token;
  ctx.body = token; // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
});

function isAuthenticated(ctx, next) {
  const {token} = ctx.request.query; // ^^^^^^^^^^^ это окуда мы читаем?
  if (!token) ctx.throw(401, 'no token');

  const user = users.find(u => u.token === token);
  if (!user) ctx.throw(401, 'token expired');

  ctx.user = user;
  return next();
}

router.get('/me(/another_path)?',
  function isAuthenticated(ctx, next) {
    const {token} = ctx.request.query;
    if (!token) ctx.throw(401, 'no token');

    const user = users.find(u => u.token === token);
    if (!user) ctx.throw(401, 'token expired');
    /*
    ctx.body = {
        email : user.email,
        name : user.name,
    };
    */
    ctx.user = user;
    return next();

  }, function me(ctx, next) {
    ctx.body = {
      email: ctx.user.email,
      name: ctx.user.name,
    };
  });


router.get('/private', isAuthenticated, (ctx, next) => {
  ctx.body = 'private information';
});

app.use(router.routes());

app.listen(3000);

// ==================================================================
/* **
if (!email || !password) ctx.throw(400, 'no email or password');
// аналогично:
if (!email || !password) {
    ctx.status = 400;
    ctx.body = 'no email or password';
    return;
}
*/
