const mongoose = require('mongoose');
const connection = require('../libs/connection');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  subcategory: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  images: [String],

});

// productSchema.index({title: 1, description: 1});
productSchema.index(
    {
      title: 'text',
      description: 'text',
    },
    {
      name: 'TextSearchIndex',
      weights: {
        title: 10,
        description: 5,
      },
      default_language: 'russian',
    },
);

module.exports = connection.model('Product', productSchema);
