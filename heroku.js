const http = require('http');
const path = require('path');
const port = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  if (req.url !== '/favicon.ico') {
    path.resolve(__dirname, './dist/favicon.ico');
  } else {
    path.resolve(__dirname, './dist/index.html');
    res.end();
  }
});

server.listen(port, () => {
  console.log('ExcelJs is runing on the heroku serer');
});
