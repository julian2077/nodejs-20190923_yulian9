const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  // const categories = await Category.find(); // User.find({ name: 'Ivan' });

  const categories = await Category.find();
  const result = categories
      .map((item) => { // возвращает массив результатов
      // .map(({id, title, subcategories}) => { // возвращает массив результатов
        // const {id, title, subcategories} = item;

        console.log(` categoryList categories item = ${item}`);
        // console.log(` categories id = ${id}`);
        // console.log(` categories title = ${title}`);
        // console.log(` categories subcategories = ${subcategories} \n`);

        // subcategories = subcategories.map(({id, title}) => ({id, title}));

        // return ({id, title, subcategories});
        // return (subcategories);
        return (item);
      });

  ctx.body = {categories: result}; // *********  ???????  ********
};

// *****************************************************************************
/*
## Получение списка категорий ###########################

| Метод | Ссылка          | Описание                   | Параметры |
|-------|-----------------|----------------------------|-----------|
| GET   | /api/categories | Получение списка категорий | -         |


Пример ответа сервера:
```js
{
  categories: [{
    id: '5d208e631866a7366d831ffc',
    title: 'Category1',
    subcategories: [{
      id: '5d208e631866a7366d831ffd',
      title: 'Subcategory1'
    }]
  }]
}
```
*/
