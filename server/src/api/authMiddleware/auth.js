const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  // 헤더 or url로부터 토큰 읽는다.
  const token = req.headers['x-access-token'] || req.query.token

  // 토큰이 없으면
  if (!token) {
    return res.status(403).json({
      success: false,
      message: '로그인 실패'
    })
  }

  // decode 프로미스 만들기
  const p = new Promise(
    (resolve, reject) => {
      jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
        if (err) reject(err)
        resolve(decoded)
      })
    }
  )

  // 인증 실패하면 에러
  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message
    })
  }

  // 프로미스 실행
  p.then((decoded) => {
    req.decoded = decoded
    next()
  }).catch(onError)
}

module.exports = authMiddleware