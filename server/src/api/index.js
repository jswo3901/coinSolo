const user = require('./user')

const api = require('express').Router()

api.use('/user', user)

module.exports = api