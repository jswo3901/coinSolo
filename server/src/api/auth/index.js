const auth = require('express').Router()
const authCtrl = require('./auth.ctrl')

auth.route('/')
  .post(authCtrl.register)

module.exports = auth