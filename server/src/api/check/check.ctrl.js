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