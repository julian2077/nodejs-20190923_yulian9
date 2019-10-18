const promise = new Promise(resolve => {  });

promise.then(
  (res) => {},
  (err) => {}
);

promise
  .then(res => {})
  .catch(err => {});
