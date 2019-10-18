const Koa = require('koa');
const mongoose = require('mongoose');

const Router = require('koa-router');
const User = require('./models/User');

const app = new Koa();

app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = err.message;
      return;
    }

    if (err.name === 'ValidationError') {
      ctx.status = 400;
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
  const users = await User.find();
  ctx.body = users;
});

router.get('/users/:id', async (ctx) => {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) ctx.throw(400, 'невалидный id');

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
  // try {
  const user = await User.findByIdAndUpdate(ctx.params.id, {
    name: ctx.request.body.name,
    age: ctx.request.body.age,
  }, {
    runValidators: true,
  });

  ctx.body = user;
  // } catch (err) {
  //   ctx.body = 'alal';
  // }
});

router.post('/users', async (ctx) => {
  const user = await User.create({
    email: ctx.request.body.email,
    name: ctx.request.body.name,
    age: ctx.request.body.age,
    gender: ctx.request.body.gender,
    friends: (ctx.request.body.friends.split(',')),
  });

  ctx.body = user;
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
