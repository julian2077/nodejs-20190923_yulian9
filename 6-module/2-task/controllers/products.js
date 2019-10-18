const mongoose = require('mongoose');
const Product = require('../models/Product');
// const itemProduct = require('../libs/itemProduct'); // возможно будет нужно !!!

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.request.query; // по подкатегории получить все продукты
  // const {subcategory} = ctx.query; // по подкатегории получить все продукты

  if (!subcategory) { // если нет subcategory
    console.log(`productsBySubcategory Not SubCategory !`);
    return next();
  }

  if (!mongoose.Types.ObjectId.isValid(subcategory)) {
    ctx.throw(400, 'Invalid Id SubCategories !!!');
  }

  console.log(`productsBySubcategory before :`);
  console.log(`productsBySubcategory subCategory = ${subcategory}`);

  const products = await Product.find({subcategory}); // {subcategory: subcategory}
  console.log(`productsBySubcategory products : "${products}"`);

  if (products == '') {
    ctx.throw(404, `Product not found by Id SubCategory = ${subcategory}`);
  };
  // const result = products.map(itemProduct);

  const result = products.map((item) => { // возвращает массив результатов
    // .map(({id, title, subcategories}) => { // возвращает массив результатов
    // const {id, title, subcategories} = item;

    console.log(`productsBySubcategory products item = ${item}`);
    // subcategories = subcategories.map(({id, title}) => ({id, title}));

    // return ({id, title, subcategories});
    // return (subcategories);
    return (item);
  });

  console.log(`productsBySubcategory end :`);
  console.log(`products = ${result}`);

  ctx.body = {products: result};

  // const products = await Product.find();
  /* const result = products
      .map((item) => { // возвращает массив результатов
      .map(({id, title, subcategories}) => { // возвращает массив результатов
        const {id, title, subcategories} = item;
        console.log(` categories subcategories = ${subcategories} \n`);
      });   */

  // ctx.body = {products: [products]};
  // next();
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find(); // .limit(25); // получить все продукты

  // const result = products.map(itemProduct);
  // console.log(` productList products = ${result}`);
  // ctx.body = {products: result};

  const result = products.map((item) => { // возвращает массив результатов
    // .map(({id, title, subcategories}) => { // возвращает массив результатов
    // const {id, title, subcategories} = item;

    console.log(` productList products item = ${item}`);
    // subcategories = subcategories.map(({id, title}) => ({id, title}));

    // return ({id, title, subcategories});
    // return (subcategories);
    return (item);
  });
  ctx.body = {products: result};

  // console.log(` productList products = ${products}`);
  // ctx.body = {products: [products]}; // это массив в массиве

  // ctx.body = {products: products.map(itemProduct)};
};

module.exports.productById = async function productById(ctx, next) {
  const {id} = ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(400, `Invalid Id Product's = ${id}`);
  };

  const product = await Product.findById(id); // по Id продукта получить продукт
  if (!product) {
    ctx.throw(404, `No product with id = ${id}`);
  };

  // console.log(` productById product : ------------ ${product}`);
  ctx.body = {product: product};
  // ctx.body = {product: product.toJSON()}; // не влияет
  // ctx.body = {product: itemProduct(product)};
};
