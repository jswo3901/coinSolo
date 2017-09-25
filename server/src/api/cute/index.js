const cute = require('express').Router()
const cuteCtrl = require('./cute.ctrl')

cute.route('/')
  .post(cuteCtrl.postCute)
  .get(cuteCtrl.getCute)

cute.route('/:id')
  .delete(cuteCtrl.deleteCute)
  .put(cuteCtrl.putCute)

module.exports = cute