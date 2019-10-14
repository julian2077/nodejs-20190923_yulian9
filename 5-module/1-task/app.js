const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD
router.get('/subscribe', async (ctx, next) => { // `GET /subscribe` - получение новых сообщени
  // new Promise
  const promise = new Promise((resolve, reject) => {
    let nn = {};

    if (ctx.request.body != nn) {
      ctx.body = ctx.request.body;
      resolve(ctx.request.body);
    }
  });

  promise.then();

  console.log('Get /subscribe');
  console.log(ctx.request.body);
  // ctx.body = user; // в ответ возвращаем пользователя
});

router.post('/publish', async (ctx, next) => { // `POST /publish` - отправка сообщения
  // const user = await
  // ctx.body = user; // в ответ возвращаем пользователя
  console.log('Post /publish');
  console.log(ctx.request.body);
=======
const clients = new Set();

router.get('/subscribe', async (ctx, next) => {
  const message = await new Promise((resolve, reject) => {
    clients.add(resolve);

    ctx.res.on('close', function() {
      clients.delete(resolve);
      resolve();
    });
  });

  ctx.body = message;
});

router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;

  if (!message) {
    ctx.throw(400, 'required field `message` is missing');
  }

  clients.forEach(function(resolve) {
    resolve(message);
  });

  clients.clear();

  ctx.body = 'ok';
>>>>>>> aba81191f447751e59f11afa58142bb12e4fadc7
});


app.use(router.routes());

module.exports = app;
