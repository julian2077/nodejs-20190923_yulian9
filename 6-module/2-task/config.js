module.exports = {
  mongodb: {
    uri: (process.env.NODE_ENV === 'test')
      ? 'mongodb://localhost:27017/6-module-2-task'
      : 'mongodb://localhost:27017/any-shop',
    // : 'mongodb://localhost:27017/users_app'
  },
};

// 6-module-2-task
