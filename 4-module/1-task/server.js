const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  // const pathnameFull = url.parse(req.url).pathname;
  const pathname = url.parse(req.url).pathname.slice(1); // без слеша "/index.spec.js"
  const filepath = path.join(__dirname, 'files', pathname);

  // const i = pathname.indexOf('/');
  // console.log(`i = ${i}`);

  // console.log(`pathnameFull = ${pathnameFull}`);
  // console.log(`pathname = ${pathname}`);
  // console.log(`filepath = ${filepath}`);

  // проверка есть ли файл на диске
  // - Если файла на диске нет - сервер должен вернуть ошибку `404`.
  // - Вложенные папки не поддерживаются, при запросе вида `/dir1/dir2/filename` - ошибка `400`.

  if (pathname.indexOf('/') >= 0) {
    res.statusCode = 400;
    res.end('Вложенные папки не поддерживаются');
  };

  switch (req.method) {
    case 'GET':
      // console.log(' GET !!!');

      fs.createReadStream(filepath)
          .on('error', (err) => {
            if (err.code === 'ENOENT') {
              res.statusCode = 404;
              res.end('file does not exist');
            } else {
              res.statusCode = 500;
              res.end('internal server error');
            }
          })
          .pipe(res);

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
