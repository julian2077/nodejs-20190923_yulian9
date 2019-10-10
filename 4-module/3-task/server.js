const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);

  if (pathname.indexOf('/') >= 0) {
    res.statusCode = 400;
    res.end('Вложенные папки не поддерживаются');
  };

  switch (req.method) {
    case 'DELETE':

      fs.unlink(filepath, (err) => {
        if (!err) {
          res.statusCode = 200;
          return res.end('ok!');
        };
        if (err.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('file does not exist');
        } else {
          console.log(err);
          res.statusCode = 500;
          res.end('internal server error');
        }
      });

      break;
    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
/*
# Файловый сервер - удаление файла

В данной задаче вам необходимо будет реализовать http-сервер, который по запросу пользователя будет
удалять файл с диска.

- `DELETE /[filename]` - удаление файла из папки `files`.
    - При успешном удалении сервер должен вернуть ответ со статусом `200`
    - Если файла на диске нет - сервер должен вернуть ошибку `404`.
    - Вложенные папки не поддерживаются, при запросе вида `/dir1/dir2/filename` - ошибка `400`.

При любых других ошибках сервер должен, по возможности, возвращать ошибку `500`.
*/
