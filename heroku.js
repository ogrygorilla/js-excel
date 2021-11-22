const http = require('http');
const path = require('path');
const port = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.sendFile(path.resolve(__dirname, './dist/favicon.ico'));
  } else {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
  }
});

server.listen(port, () => {
  console.log('ExcelJs is runing on the heroku server');
});
