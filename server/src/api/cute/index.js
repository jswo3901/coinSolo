const cute = require('express').Router()
const cuteCtrl = require('./cute.ctrl')

cute.route('/')
  .post(cuteCtrl.postCute)

module.exports = cute