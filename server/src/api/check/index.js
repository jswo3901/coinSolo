const check = require('express').Router()
const checkCtrl = require('./check.ctrl')
const authMiddleware = require('../authMiddleware/auth')

check.use('/', authMiddleware)
check.get('/', checkCtrl.check)
module.exports = check