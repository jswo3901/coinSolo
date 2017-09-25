import express from 'express'
import path from 'path'

const app = express()
const config = require('./db/dbconfig.js')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 요청 로그 콘솔에 띄우기
app.use(morgan('dev'))

// 클라이언트 빌드파일 직접 제공받게 설정
app.use(express.static(path.resolve(__dirname, '..', '..', 'client/build')))

// 시크릿 키 jwt
app.set('jwt-secret', config.secret)
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