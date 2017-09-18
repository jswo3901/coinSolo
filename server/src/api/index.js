const test = require('./test')
const test2 = require('./test2')

const api = require('express').Router()

api.use('/test', test)
api.use('/test2', test2)

module.exports = api