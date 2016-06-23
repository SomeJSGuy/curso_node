const http = require('http');
const fs = require('fs');

const myServer = require('./lib/server.js');

const publicDirectory = process.cwd() + '/public';

const server = http.createServer((req, res) => {
  console.log('req.headers: ', req.headers, '\n', 'req.url: ', req.url, '\n\n');
  let file = '';
  var content = '';
  if (req.url == '/') {
    file = '/index.html';
  }

  try {
    content = fs.readFileSync(publicDirectory + file);
  }
  catch (e) {
    content = fs.readFileSync(publicDirectory + '/404.html');
  } 
	
  res.end('content: ' + content);
});

server.on('clientError', (err, socket) => {
	socket.end('HTTP/1.1 400 bad request\r\n\r\n');
});

server.listen(8080);
