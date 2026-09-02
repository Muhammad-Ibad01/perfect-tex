const http = require('http');
const fs = require('fs');
const path = require('path');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.jpeg': 'image/jpeg', '.png': 'image/png' };
http.createServer((req, res) => {
  const requested = req.url === '/' ? 'index.html' : req.url.split('?')[0].replace(/^\//, '');
  const file = path.join(__dirname, requested);
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173'));
