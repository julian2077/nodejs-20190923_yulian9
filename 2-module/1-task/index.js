const LimitSizeStream = require('./LimitSizeStream');
const fs = require('fs');

const limitedStream = new LimitSizeStream({limit: 8}); // 8 байт
const outStream = fs.createWriteStream('out.txt');

limitedStream.pipe(outStream);

limitedStream.write('hello'); // 'hello' - это 5 байт, поэтому эта строчка целиком записана в файл

setTimeout(() => {
  limitedStream.write('world'); // ошибка LimitExceeded! в файле осталось только hello
}, 10);

/*
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
