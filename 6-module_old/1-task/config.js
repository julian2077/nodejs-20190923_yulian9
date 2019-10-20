module.exports = {
  mongodb: {
    uri: (process.env.NODE_ENV === 'test'
      ? 'mongodb://localhost:27017/6-module-1-task'
      : 'mongodb://localhost:27017/any-shop'),
  },
};
