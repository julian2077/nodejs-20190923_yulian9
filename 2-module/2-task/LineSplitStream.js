const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._encoding = options.encoding; // 'utf-8'
    this.remainder = '';
  }

  _transform(chunk, encoding, callback) {
    let str = this.remainder + chunk.toString();
    str = str.trim();
    const lines = str.split(os.EOL);
    const lastLine = lines.pop();
    this.remainder = '';

    for (const line of lines) {
      this.push(line);
    }

    this.remainder = lastLine;
    callback();
  }

  _flush(callback) {
    if (this.remainder) {
      this.push(this.remainder);
    }
    callback();
  }
}
module.exports = LineSplitStream;

// if (str.endsWith(os.EOL)) {

// _transform(chunk, encoding, callback) {
//       let str = chunk.toString();
//       if (str.includes(os.EOL)) {
//           let arr = str.split(os.EOL); // из строки получить массив строк
//
//           arr.forEach((item, index, array) => {
//               console.log(item);
//               this.push(item);      // + `${os.EOL}`);  // + delim);
//               // this._str = item;
//           });
//       } else { this.push(str); }
//       callback();
// }

// _transform(chunk, encoding, callback) {
//   const str = this.remainder + chunk.toString();
//   const lines = str.split(os.EOL);
//   const lastLine = lines.pop();
//   this.remainder = '';

//   for (const line of lines) {
//     this.push(line);
//   }

//   if (str.endsWith(os.EOL)) {
//     this.push(lastLine);
//   } else {
//     this.remainder = lastLine;
//   }

//   callback();
// }

// _flush(callback) {
//   if (this.remainder) {
//     this.push(this.remainder);
//   }
//   callback();
// }
// }
