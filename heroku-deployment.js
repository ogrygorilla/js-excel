const http = require('http');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  // if (req.url === '/favicon.ico') {
  //   const icon = fs.readFileSync(path.resolve(__dirname, './dist/favicon.ico'), 'utf8');
  //   console.log(icon);
  //   // res.setHeader('Content-Type', 'text/javascript');
  //   res.write(icon);
  //   res.end();
  // } else if (req.url === '/') {
    const indexHtml = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf8');
    console.log(indexHtml);
    res.setHeader('Content-Type', 'text/html');
    res.write(indexHtml);
    res.end();
  // }

//   if (req.url.endsWith('.html')) {
//     const indexHtml = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf8');
//     res.setHeader('Content-Type', 'text/javascript');
//     res.write(indexHtml);
//     res.end();
//   } else if (req.url.endsWith('.js')) {
//     const jsFile = fs.readdirSync(path.resolve(__dirname, './dist', 'utf8')).filter((fn) => fn.endsWith('.js'));
//     res.write(jsFile);
//     res.end();
//   } else if (req.url.endsWith('.css')) {
//     const cssFile = fs.readdirSync(path.resolve(__dirname, './dist', 'utf8')).filter((fn) => fn.endsWith('.js'));
//     res.write(cssFile);
//     res.end();
//   } else if (req.url.endsWith('.ico')) {
//     const icon = fs.readFileSync(path.resolve(__dirname, './dist/favicon.ico'), 'utf8');
//     res.write(icon);
//     res.end();
//   }
});

server.listen(port, () => {
  console.log('ExcelJs is runing on the heroku server');
});
