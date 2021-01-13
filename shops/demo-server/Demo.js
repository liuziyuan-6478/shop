// let user = require('./User')

// console.log(`username:${user.username}`);

// console.log(`${user.sayHello()}`);

let http = require('http')
let url = require('url')
let util = require('util')

let server = http.createServer((req, res) => {
  res.statusCode = 200;

  res.setHeader('Content-Type', 'text/plain; charest=UTF-8')

  // url.parse(req.url)
  // util.inspect(url.parse(req.url))

  res.end(util.inspect(url.parse(req.url)))
})

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器运行http://127.0.0.1:3000');
})