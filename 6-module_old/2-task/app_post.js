const Koa = require('koa');
const mongoose = require('mongoose');

const Router = require('koa-router');
const {productsBySubcategory, productList, productById} = require('./controllers/products');
const {categoryList} = require('./controllers/categories');
const Category = require('./models/Category');
const Product = require('./models/Product');
// const User = require('./models/User');

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

const router = new Router({prefix: '/api'}); // /api/category/

// задать: title = "Детские товары и игрушки" ==================================
router.post('/category', async (ctx) => {
  console.log(` /category ctx.request.body = ${ctx.request.body}`);
  console.log(` /category ctx.request.body.id = ${ctx.request.body.id}`);
  console.log(` /category ctx.request.body.title = ${ctx.request.body.title}`);
  console.log(` /category ctx.request.body.subcategories = ${ctx.request.body.subcategories}`);

  const category = await Category.create({
    title: ctx.request.body.title, // из koa-bodyparser получаем ctx.request.body
    subcategories: [
      {title: 'Прогулки и детская комната'},
      {title: 'Кормление и гигиена'},
      {title: 'Игрушки и развлечения'},
      {title: 'Активный отдых и улица'},
      {title: 'Радиоуправляемые модели'},
      {title: 'Школьные товары'},
    ],
  });
  //   subcategories: (ctx.request.body.subcategories),
  // }); // friends: (ctx.request.body.friends.split(',')),
  ctx.body = category; // в ответ возвращаем пользователя
});

router.post('/product', async (ctx) => {
  // console.log(` /product ctx.request.body = ${ctx.request.body}`);
  // console.log(` /product ctx.request.body.title = ${ctx.request.body.title}`);
  // console.log(` /product ctx.request.body.category = ${ctx.request.body.category}`);
  // console.log(` /product ctx.request.body.subcategory = ${ctx.request.body.subcategory}`);

  // const images = ctx.request.body.images.split(',');
  // console.log(` /product ctx.request.body.images = ${images}`);
  /* -------------------------------------------------
  "title" : "Коляска Adamex Barletta 2 in 1",
  "description" : "Универсальная модель, которая с легкостью заменит родителям сразу ...",
  "price" : 21230,
  ----------------------------------------------------------- */
  const product = await Product.create({
    title: ctx.request.body.title, // из koa-bodyparser получаем ctx.request.body
    description: ctx.request.body.description,
    price: ctx.request.body.price,
    category: ctx.request.body.category,
    subcategory: ctx.request.body.subcategory,
    images: (ctx.request.body.images.split(',')),
  });
  ctx.body = product; // в ответ возвращаем пользователя
});

router.get('/categories', categoryList);
router.get('/products', productsBySubcategory, productList);
router.get('/products/:id', productById);

app.use(router.routes());
module.exports = app;
