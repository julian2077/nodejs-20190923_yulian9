const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._limit = options.limit;
    this._size = 0;
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString();
    const len = str.length;

    if ((this._size + len) > this._limit ) {
      callback(new LimitExceededError); // throw
    } else {
      this._size += len; // console.log(str);
      this.push(chunk);
      callback();
    }
  }
}
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
