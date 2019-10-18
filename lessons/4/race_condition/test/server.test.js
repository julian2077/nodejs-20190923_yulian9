const server = require('../server');
const {expect} = require('chai');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

describe('server tests', () => {
  before(done => {
    fs.copyFileSync(
      path.join(__dirname, 'fixtures/small.png'),
      path.join(__dirname, '../files/small.png')
    );
    server.listen(3001, done);
  });
  after(done => {
    server.close(done);
  });
  
  xit('should return file', async () => {
    const response = await axios.get('http://localhost:3001/small.png');
    expect(response.status).to.be.equal(200);
  });
  
  xit('should remove file', async () => {
    const response = await axios.delete('http://localhost:3001/small.png');
    expect(response.status).to.be.equal(200);
  });
  
  it('should get & delete file', async () => {
    const [res1, res2] = await Promise.all([
      axios.get('http://localhost:3001/small.png'),
      axios.delete('http://localhost:3001/small.png'),
    ]);
  
    expect(res1.status).to.be.equal(200);
    expect(res2.status).to.be.equal(200);
  });
});
