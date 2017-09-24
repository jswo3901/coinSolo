const User = require('db/models/user')

/* 
    POST /api/auth
    {
        username,
        password
    }
*/

exports.register = (req, res) => {
  const { username, password } = req.body
  let newUser = null

  // 중복되지 않으면 새유저 생성
  const create = (user) => {
    if (user) {
      throw new Error('중복된 아이디 존재')
    } else {
      return User.create(username, password)
    }
  }

  // 유저 수 카운트
  const count = (user) => {
    newUser = user
    return User.count({}).exec()
  }

  // 첫 가입자는 관리자 권한 부여
  const assign = (count) => {
    if (count === 1) {
      return newUser.assignAdmin()
    } else {
      return Promise.resolve(false) // 1이 아니면 fasle리턴 (promise사용)
    }
  }

  // 응답
  const respond = (isAdmin) => {
    res.json({
      message: '가입되었습니다.',
      // admin : isAdmin ? true : false 3항연산자 사용해야함.
      admin: false
    })
  }

  // 아이디가 중복되면
  const onError = (error) => {
    res.status(409).json({
      message: error.message
    })
  }

  // 아이디 복사 체크
  User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}