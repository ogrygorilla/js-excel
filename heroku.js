const http = require('http');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    const icon = fs.readFileSync(path.resolve(__dirname, './dist/favicon.ico'), 'utf8');
    console.log(icon);
    res.setHeader('Content-Type', 'application/json');
    res.write(icon);
    res.end();
  } else {
    const indexHtml = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf8');
    console.log(indexHtml);
    res.setHeader('Content-Type', 'application/json');
    res.write(indexHtml);
    res.end();
  }
});

server.listen(port, () => {
  console.log('ExcelJs is runing on the heroku server');
});
