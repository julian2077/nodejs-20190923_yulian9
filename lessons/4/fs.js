const fs = require('fs');

function readFile(file, options = {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, options, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

async function main() {
  // try {
  const content = await readFile('__filename', {encoding: 'utf-8'});
  return content;
  // } catch (err) {
  //   throw err;
  // }
}

main()
  .then(file => console.log(file))
  .catch(err => console.log(err));

