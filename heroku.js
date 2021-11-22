const http = require('http');
const path = require('path');
const port = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    const icon = path.resolve(__dirname, './dist/favicon.ico');
    res.write(icon);
    res.end();
  } else {
    const indexHtml = path.resolve(__dirname, './dist/index.html');
    res.write(indexHtml);
    res.end();
  }
});

server.listen(port, () => {
  console.log('ExcelJs is runing on the heroku server');
});
