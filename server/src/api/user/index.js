const user = require('express').Router()
const userCtrl = require('./user.ctrl')

user.route('/')
  .post(userCtrl.postUser)

module.exports = user