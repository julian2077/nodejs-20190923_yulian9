const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
<<<<<<< HEAD
    this._limit = options.limit;
    this._size = 0;
=======
<<<<<<< HEAD
    this._limit = options.limit;
    this._size = 0;
=======

    this.limit = options.limit;
    this.size = 0;
    this.isObjectMode = !!options.readableObjectMode;
>>>>>>> 8b1249c5f87db624908ba992e199338e2e49262b
>>>>>>> 4d8e42084f05ab482c6c76465842cf91506f5068
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString();
    const len = str.length;

<<<<<<< HEAD
    if ((this._size + len) > this._limit ) {
      callback(new LimitExceededError); // throw
=======
<<<<<<< HEAD
        var str = chunk.toString();
        var len = str.length;
=======
    if (this.size > this.limit) {
      callback(new LimitExceededError());
>>>>>>> 4d8e42084f05ab482c6c76465842cf91506f5068
    } else {
      this._size += len; // console.log(str);
      this.push(chunk);
      callback();
    }
  }
}
<<<<<<< HEAD
=======
>>>>>>> 8b1249c5f87db624908ba992e199338e2e49262b

        if ((this._size + len) > this._limit ) {
            callback(new LimitExceededError); // throw
        } else {
            this._size += len;    // console.log(str);
            this.push(chunk);
            callback();
        }
    }
}
>>>>>>> 4d8e42084f05ab482c6c76465842cf91506f5068
module.exports = LimitSizeStream;

/* -----------------------------------------------------------------
В данной задаче вам необходимо реализовать класс `LimitSizeStream`,
который будет подсчитывать количество переданной через него информации
и бросать ошибку если ее объем превысит допустимое значение.

Класс является наследником `stream.Transform` и принимает
параметр `limit`, который и является максимальным размером
передаваемых данных в байтах.

Таким образом, при включении этого стрима в цепочку он должен будет
подсчитывать количество передаемых данных, а при превышении максималь-
но допустимого значения выбрасывать ошибку `LimitExceededError`.
Стрим не изменяет передаваемые данные, просто передавая их дальше.

Для простоты поддерживать объектный режим стримов не нужно, однако
вы можете это сделать опционально.
*/
