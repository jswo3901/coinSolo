const jwt = require('jsonwebtoken')
/* 
    
    Get /api/check

*/

exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded
  })
}
// 미들웨어 만들어서 간단해졌음.