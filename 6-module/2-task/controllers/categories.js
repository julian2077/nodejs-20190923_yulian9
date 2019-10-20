const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find();
  const result = categories
      .map((item) => {
        // console.log(` categoryList categories item = ${item}`);
        return (item);
      });
  ctx.body = {categories: result}; // *********  ???????  ********
};
