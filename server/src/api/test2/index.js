const testCtrl2 = require('./test2.ctrl')
const test2 = require('express').Router()

test2.route('/')
  .get(testCtrl2.getTest2)

test2.route('/:id')
  .get(testCtrl2.getTest2Id)

module.exports = test2