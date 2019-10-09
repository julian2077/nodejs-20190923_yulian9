const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
<<<<<<< HEAD
   constructor(options) {
       super(options);
        this._encoding = options.encoding; //: 'utf-8'
        // this._buffer = '';
        this.remainder = '';
   }

   _transform(chunk, encoding, callback) {
      let str = this.remainder + chunk.toString();
      str = str.trim();
      const lines = str.split(os.EOL);
      const lastLine = lines.pop();
      this.remainder = '';

      // let i = 11;
      for (const line of lines) {
        // console.log(`${i} - ${line}`);
        this.push(line);
        // i++;
      }

      // if (str.endsWith(os.EOL)) {
      //     this.push(lastLine);
      // } else {
          this.remainder = lastLine;
      // }
      callback();
   }

  // _transform(chunk, encoding, callback) {
  //       let str = chunk.toString();
  //                                           // console.log(encoding); // 'buffer'
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

  _flush(callback) {
      if (this.remainder) {
          this.push(this.remainder);
      }
      callback();
=======
  constructor(options) {
    super(options);

    this.remainder = '';
  }

  _transform(chunk, encoding, callback) {
    const str = this.remainder + chunk.toString();
    const lines = str.split(os.EOL);
    const lastLine = lines.pop();
    this.remainder = '';

    for (const line of lines) {
      this.push(line);
    }

    if (str.endsWith(os.EOL)) {
      this.push(lastLine);
    } else {
      this.remainder = lastLine;
    }

    callback();
  }

  _flush(callback) {
    if (this.remainder) {
      this.push(this.remainder);
    }

    callback();
>>>>>>> 8b1249c5f87db624908ba992e199338e2e49262b
  }
}

module.exports = LineSplitStream;
