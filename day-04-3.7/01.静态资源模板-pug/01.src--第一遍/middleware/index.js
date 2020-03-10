/*
  中间件函数
    用来处理请求、返回响应的功能函数
*/
const path = require("path");
const fs = require("fs");
const util = require("util");
const pug = require("pug");
const getMimeType = require('../util/mime');
const compress = require('../util/compress');

const {
  root
} = require("../config");

const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
//const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
  // 处理请求的回调函数
  // 获取请求路径  /src
  const url = req.url;
  // 组成绝对路径
  const filePath = path.resolve(root, `.${url}`);

  try {
    // 分析文件路径，返回一个stats
    const stats = await stat(filePath);

    // 但是还要判断是文件还是文件夹
    if (stats.isDirectory()) {
      // 说明是文件夹
      // 读取文件夹里面的内容
      const files = await readdir(filePath);

      // 渲染pug成html
      const pugFilePath = path.resolve(__dirname, '../view/index.pug');
      const html = pug.renderFile(pugFilePath, {
        files,
        url
      });

      // 返回响应
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html;charset=utf8");
      res.end(html);

      return;
    }

    if (stats.isFile()) {
      // 说明是文件
      // 读取文件里面的内容
      //const data = await readFile(filePath);
      //流式读取文件
      let rs = fs.createReadStream(filePath)
      const mimeType = getMimeType(filePath)
      //只有js/json/css/html文件才压缩
      if (mimeType.match(/json|css|html|javaScript/)) {
        //开始压缩
        rs = compress(rs, req, res);
      }

      // 返回响应
      res.statusCode = 200;
      res.setHeader("Content-Type", `${mimeType};charset=utf8`);
      rs.pipe(res)
      //res.end(data);
      return;
    }
  } catch (e) {
    console.log(e);
    // 说明以上异步方法有一个出错了~
    // 说明文件找不到，返回404
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain;charset=utf8");
    res.end(`${url} 不是一个文件或文件夹`);
  }
};