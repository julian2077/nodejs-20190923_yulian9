const mongoose = require('mongoose');
const Product = require('../models/Product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  // const {title} = ctx.params;
  // const {query} = ctx.request.query;
  const {query} = ctx.request;
  // const {title} = ctx.request.query;

  console.log(` roductsByQuery in query = ${query}`);
  // console.log(` roductsByQuery in title = ${title}`);

  // if (!title) {
  //   return next();
  // };

  // const products = await Product.find({title: title, description: title});
  // const products = await Product.find({$TextSearchIndex: {$search: title}});
  const products = await Product.find({$text: {$search: query}});
  // const products = await Product.find({$text: {$search: title}});

  if (products == '') {
    ctx.throw(404, `Product not found by name = '${title}'`);
  };

  if (!products) {
    ctx.throw(404, `No products with name '${title}'`);
  };

  const result = products.map((item) => { // возвращает массив результатов
    console.log(` roductsByQuery products item = ${item}`);
    return (item);
  });

  // console.log(` products : ------------ ${products}`);
  ctx.body = {product: result};
  // ctx.body = {products: []};
};
// GET /api/products?query=Product1
