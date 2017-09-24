const login = require('express').Router()
const loginCtrl = require('./login.ctrl')

login.route('/')
  .post(loginCtrl.login)

module.exports = login