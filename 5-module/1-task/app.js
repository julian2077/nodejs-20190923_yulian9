const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

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
});


app.use(router.routes());

module.exports = app;
