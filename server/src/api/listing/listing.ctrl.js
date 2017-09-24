const User = require('db/models/user')
/*
  GET /api/listing
*/

exports.list = (req, res) => {
  // // 관리자 아니면 거부
  // if (!req.decoded.admin) {
  //   return res.status(403).json({
  //     message: '관리자 권한이 없습니다.'
  //   })
  // }

  // User.find({})
  //   .then(
  //     users => {
  //       res.json({users})
  //     }
  //   )
  res.send(req)
}

/*
  POST /api/listing
*/

exports.assignAdmin = (req, res) => {
  // 관리자 아니면 거부
  if (!req.decoded.admin) {
    return res.status(403).json({
      message: '관리자 권한이 없습니다.'
    })
  }

  User.findOneByUsername(req.params.username)
    .then(
      user => user.assignAdmin
    ).then(
      res.json({
        success: true
      })
    )
}