const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false }
})

// 새 유저 생성
userSchema.statics.create = function(username, password) {
  const user = new this({
    username,
    password
  })

  return user.save()
}

userSchema.statics.findOneByUsername = function(username) {
  return this.findOne({
    username
  }).exec()
}

// 비밀번호 verify
userSchema.methods.verify = function(password) {
  return this.password === password
}
// 유저를 관리자 계정으로 설정. 
userSchema.methods.assignAdmin = function() {
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('User', userSchema)