const mongoose = require('mongoose');
const connection = require('../libs/connection');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { // описание товара.
    type: String,
    required: true,
  },
  price: { // цена товара.
    type: Number,
    required: true,
  },
  category: { // идентификатор категории товара.
    type: mongoose.Types.ObjectId, // mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  subcategory: { // идентификатор категории товара.
    type: mongoose.Types.ObjectId, // mongoose.Schema.Types.ObjectId,
    required: true,
  },
  images: [{ // массив ссылок изображений, массив строк
    type: String,
  }],
});

module.exports = connection.model('Product', productSchema);
