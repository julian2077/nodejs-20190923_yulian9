const mongoose = require('mongoose');
const mongooseUniquePlugin = require('mongoose-beautiful-unique-validation');

const options = {
  useCreateIndex: true, // moy
  useUnifiedTopology: true, // moy
  // debug: true, // здесь эту опцию обругал Lint
  useNewUrlParser: true,
  useFindAndModify: false,
};

// mongoose.set('useCreateIndex', true); // moy
// mongoose.set('useUnifiedTopology', true); // moy
//
mongoose.set('debug', true); // отображается в консоли, что делает mongoose

mongoose.plugin(mongooseUniquePlugin); /* перехватывает MongoError ошибки
                                          и приводит их красивому виду */

// в строке для коннекта НУЖНО ТОЛЬКО имя db !!!
// const db = 'mongodb://localhost/users_app';
const db = 'mongodb://localhost:27017/users_app';
module.exports = mongoose.createConnection(db, options);
// module.exports = mongoose.createConnection('mongodb://localhost/users_app');
