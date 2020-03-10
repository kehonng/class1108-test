const http = require('http');

const {
  port,

  host
} = require('./config')
const middleware = require('./middleware')

//创建服务
const server = http.createServer(middleware);
//启动服务器
server.listen(port, host, (err) => {
  if (err) {
    console.log("服务器地址找不到:", err);
    return
  };
  const address = `http://${host}:${port}`;
  console.log("服务器地址启动成功,地址:", address);
})