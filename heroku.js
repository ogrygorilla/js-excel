const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url !== '/favicon.ico') {
    path.resolve(__dirname, './dist/favicon.ico');
  } else {
    path.resolve(__dirname, './dist/index.html');
    res.end();
  }
});

server.listen(80, () => {
  console.log('ExcelJs is runing on the heroku serer');
});
