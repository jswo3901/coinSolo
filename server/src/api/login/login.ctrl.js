const jwt = require('jsonwebtoken')
const User = require('db/models/user')
/* 
    POST /api/login
    {
        cuteValue
        
    }
*/
// login함수 내에서 유저정보 id, pw확인 , jwt토큰발급
exports.login = (req, res) => {
  const { username, password } = req.body
  const secret = req.app.get('jwt-secret')

  // 유저정보 확인
  // jwt토큰발행
  const check = (user) => {
    if (!user) {
      throw new Error('login failed')
    } else {
      if (user.verify(password)) {
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              _id: user._id,
              username: user.username,
              admin: user.admin
            },
            secret,
            {
              expiresIn: '7d',
              issuer: 'jswo3901.com',
              subject: 'userInfo'
            }, (err, token) => {
              if (err) reject(err)
              resolve(token)
            })
        })
        return p
      } else {
        throw new Error('login 실패')
      }
    }
  }

  const respond = (token) => {
    res.json({
      message: '로그인 성공',
      token
    })
  }
  const onError = (error) => {
    res.status(403).json({
      message: error.message
    })
  }
  User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError)
}