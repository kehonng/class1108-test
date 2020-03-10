/* 
  处理文件压缩
*/
const {
  createGzip,
  createDeflate
} = require('zlib')

function compress(rs, req, res) {
  //Accept-Encoding: gzip, deflate, br
  //判断是否支持压缩
  const acceptEncoding = req.headers["accept-encoding"];
  //判断以什么样的方式进行压缩
  if (acceptEncoding) {

    const acceptEncodingArr = acceptEncoding.split(', ')
    //gzip
    if (acceptEncodingArr.indexOf('gzip') !== -1) {
      res.setHeader("Content-Encoding", "gzip");
      return rs.pipe(createGzip())
    }
    //deflate
    if (acceptEncodingArr.indexOf('deflate') !== -1) {
      res.setHeader("Content-Encoding", "deflate");
      return rs.pipe(createDeflate())
    }
  }
}

module.exports = compress;