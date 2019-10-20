const mongoose = require('mongoose');
const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.request.query;

  if (!subcategory) { // если нет subcategory
    console.log(`productsBySubcategory Not SubCategory !`);
    return next();
  }

  if (!mongoose.Types.ObjectId.isValid(subcategory)) {
    ctx.throw(400, 'Invalid Id SubCategories !!!');
  }

  const products = await Product.find({subcategory}); // {subcategory: subcategory}

  if (products == '') {
    ctx.throw(404, `Product not found by Id SubCategory = ${subcategory}`);
  };

  const result = products.map((item) => { // возвращает массив результатов
    // console.log(`productsBySubcategory products item = ${item}`);
    return (item);
  });

  ctx.body = {products: result};
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find(); // .limit(25); // получить все продукты

  const result = products.map((item) => { // возвращает массив результатов
    // console.log(` productList products item = ${item}`);
    return (item);
  });
  ctx.body = {products: result};
};

module.exports.productById = async function productById(ctx, next) {
  const {id} = ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(400, `Invalid Id Product's = ${id}`);
  };

  const product = await Product.findById(id); // по Id продукта получить продукт
  // if (product === null || product === undefined) {
  if (!product) {
    ctx.throw(404, `No product with id = ${id}`);
  };
  ctx.body = {product: product};
};
