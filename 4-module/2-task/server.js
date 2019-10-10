const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');
const url = require('url');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);

  console.log(`filepath = ${filepath}`);

  if (pathname.indexOf('/') >= 0) {
    res.statusCode = 400;
    res.end('Вложенные папки не поддерживаются');
  };

  switch (req.method) {
    case 'POST':
      /*
      - Если в процессе загрузки файла на сервер произошел обрыв соединения —
      созданный файл с диска надо удалять. */

      // const outStream = fs.createWriteStream('out.txt');
      const limitedStream = new LimitSizeStream({limit: 1000000}); // 8 байт
      // limitedStream.write('hello');
      const outStream = fs.createWriteStream(filepath, {
        encoding: 'utf-8',
        flags: 'wx',
      });

      // console.log(`req = ${url.parse(req)}`);
      // console.log('-------------------');
      // console.log(req.toString());
      // console.log('===================');

      limitedStream.pipe(outStream);
      limitedStream.write(req); // .toString());

      // outStream.on('finish', () => res.end('finish: file has been saved'));
      outStream.on('close', () => res.end('close: file has been saved')); // !!!!!!

      outStream.on('error', (err) => { // нужно разобраться с файлом - файл уже есть
        if (err.code === 'EEXIST') {
          res.statusCode = 409;
          res.end('file already exists');
        }
        if (err.code === 'LIMIT_EXCEEDED') {
          res.statusCode = 413;
          res.end('превышении лимит по размеру файла');
        } else {
          res.statusCode = 500;
          res.end('internal server error');
          // файл с диска удалить
        }
      });
      /* ========================================================================== /
      const file = fs.createWriteStream(filepath, {
        flags: 'wx',
      });
      req.pipe(file); // нужно тело запроса req .pipe(w);

      file.on('finish', () => res.end('finish: file has been saved'));
      file.on('close', () => res.end('close: file has been saved'));

      file.on('error', (err) => { // нужно разобраться с файлом - файл уже есть
        if (err.code === 'EEXIST') {
          res.statusCode = 409;
          res.end('file already exists');
        } else {
          res.statusCode = 500;
          res.end('internal server error');
          // файл с диска удалить
        }
      });

      // ============================================================================ */
      // let data = '';
      // req.on('data', (chunk) => { data += chunk; });
      //
      // req.on('end', () => {
      //   file.write(data);
      //   file.end();
      // });

      // file.on('end', () => console.log('EVENT: end'));
      // file.on('finish', () => console.log('EVENT: finish'));
      // file.on('close', () => console.log('EVENT: close'));
      // file.on('open', () => console.log('EVENT: open'));

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
