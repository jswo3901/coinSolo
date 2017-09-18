import express from 'express'
import path from 'path'

const app = express()

// 정적 파일 제공 경로 - 클라이언트 빌드파일 직접 제공받게 설정
app.use(express.static(path.join(__dirname, '..', '..', '/client/public')))

// api
const api = require('./api')
app.use('/api', api)

// 에러핸들러
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.sendFile(path.join(__dirname, '..', '/public/error.html'))
})

module.exports = app