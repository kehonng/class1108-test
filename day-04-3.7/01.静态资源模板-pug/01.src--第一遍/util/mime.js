/* 
  处理文件的Conten-Type
*/

const path = require('path');

const mimeTypes = {
  js: "application/javascript",
  css: "text/css",
  html: "text/html",
  txt: "text/plain",
  gif: "image/gif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  icon: "image/x-icon",
  svg: "image/svg+xml",
  json: "application/json",
  mp3: "audio/mp3",
  mp4: "video/mp4"
}

/**
 * 
 * @param {string} filePath 文件的绝对路径
 * @return {string} 文件的MimeType
 */
function getMimeType(filePath) {
  //获取文件扩展名
  const extname = path.extname(filePath).slice(1);
  return mimeTypes[extname]
}

module.exports = getMimeType