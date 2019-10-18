const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const config = require('../config');

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.set('debug', false);

mongoose.plugin(beautifyUnique);

// const path = config.mongodb.uri;
// console.log(`config.mongodb.uri ${path}`);

// const db = 'mongodb://localhost:27017/users_app';
// module.exports = mongoose.createConnection(db, options);
module.exports = mongoose.createConnection(config.mongodb.uri, options);

// const db = 'mongodb://localhost:27017/any-shop';
// module.exports = mongoose.createConnection(db, options);
