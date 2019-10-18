const Koa = require('koa');
const mongoose = require('mongoose');

const Router = require('koa-router');
const User = require('./models/User');
const Category = require('./models/Category');

const app = new Koa();

app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) { // если у ошибки есть статус, то это мы сгенерировали эту ошибку
      ctx.status = err.status;
      ctx.body = err.message;
      return;
    }

    if (err.name === 'ValidationError') {
      ctx.status = 400; // объяснение «собрал ключи у всех объектов»
      ctx.body = Object.keys(err.errors).map((key) => ( {[key]: err.errors[key].message} ));
    } else {
      ctx.status = 500;
      ctx.body = 'Internal server error';
      console.error(err);
    }
  }
});

const router = new Router();

router.get('/users', async (ctx) => {
  const users = await User.find(); // User.find({ name: 'Ivan' });
  // const users = await User.find({
  //   name: 'user',
  //   email: 'user@mail.com',
  // });
  ctx.body = users;
});

router.get('/users/:id', async (ctx) => {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) ctx.throw(400, 'невалидный id');

  // const user = await User.findOne({_id: ctx.params.id});
  // const user = await User.findById(ctx.params.id);
  // ctx.body = user;

  const user = await User.findById(ctx.params.id).populate('friends');
  ctx.body = {
    ...user.toJSON(),
    friends: user.friends.map((f) => f.name),
  };
});

router.patch('/users/:id', async (ctx) => {
  // const user = await User.findById(ctx.params.id);
  // user.name = ctx.request.body.name;
  // user.age = ctx.request.body.age;
  // await user.save();
  // ctx.body = user;

  // try { // можно добавить свою обработку ошибок
  const user = await User.findByIdAndUpdate(ctx.params.id, {
    name: ctx.request.body.name,
    age: ctx.request.body.age,
  }, {
    runValidators: true, // по-умолчанию это mongoose НЕ выполняет
  });

  ctx.body = user;
  // } catch (err) {
  //   ctx.body = 'alal'; // приэтом внешний обработчик и не узнает об этой ошибке
  // }
});

router.post('/users', async (ctx) => {
  console.log(` ctx.request.body = ${ctx.request.body}`);
  console.log(` ctx.request.body.email = ${ctx.request.body.email}`);

  // const user = await User.create(ctx.request.body);
  const user = await User.create({ // создаем пользователя
    email: ctx.request.body.email, // из koa-bodyparser получаем ctx.request.body
    name: ctx.request.body.name,
    age: ctx.request.body.age,
    gender: ctx.request.body.gender,
    friends: (ctx.request.body.friends.split(',')),
  });
  // console.log(ctx.request.body.friends);
  ctx.body = user; // в ответ возвращаем пользователя
});

router.post('/category', async (ctx) => {
  console.log(` ctx.request.body = ${ctx.request.body}`);
  console.log(` ctx.request.body.title = ${ctx.request.body.title}`);

  ctx.body = 'Ok'; // в ответ возвращаем пользователя
});

router.delete('/users/:id', async (ctx) => {
  // const user = await User.findById(ctx.params.id);
  // await user.remove();
  // ctx.body = user;

  await User.findByIdAndDelete(ctx.params.id);
  ctx.body = 'ok';
});

app.use(router.routes());

module.exports = app;
