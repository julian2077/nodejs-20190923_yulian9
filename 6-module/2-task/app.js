const Koa = require('koa');
const mongoose = require('mongoose');

const Router = require('koa-router');
const {productsBySubcategory, productList, productById} = require('./controllers/products');
const {categoryList} = require('./controllers/categories');
// const Category = require('./models/Category');
// const Product = require('./models/Product');
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
    // return; // нужно ли это здесь ПРОВЕРИТЬ!!!
  }
});

const router = new Router({prefix: '/api'}); // /api/categories/

router.get('/categories', categoryList);
router.get('/products', productsBySubcategory, productList);
router.get('/products/:id', productById);

app.use(router.routes());
module.exports = app;
