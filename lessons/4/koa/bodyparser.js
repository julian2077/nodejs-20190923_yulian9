const bodyparser = require('koa-bodyparser');

module.exports = bodyparser();

// module.exports = async function bodyparser(ctx, next) {
//   // ctx.req === req
//   // ctx.request (cookie, method, query, ...)
//   if (ctx.method !== 'POST') return next();
//
//   const body = [];
//   for await (const chunk of ctx.req) {
//     body.push(chunk);
//   }
//
//   ctx.request.body = JSON.parse(Buffer.concat(body).toString('utf-8'));
//   return next();
// };
