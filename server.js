const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(process.env.PORT || 8989, () => {
  console.log('JSON Server is running');
});
// const http = require('http');

// const PORT = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//   res.end('Server is running – json-server temporarily disabled.');
// });

// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });