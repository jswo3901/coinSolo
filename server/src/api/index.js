const atom = require('./atom')
const cute = require('./cute')
const auth = require('./auth')
const login = require('./login')
const api = require('express').Router()

api.use('/atom', atom)
api.use('/cute', cute)
api.use('/auth', auth)
api.use('/login', login)

module.exports = api