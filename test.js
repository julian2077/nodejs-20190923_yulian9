









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
}
