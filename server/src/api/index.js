const atom = require('./atom')
const cute = require('./cute')
const auth = require('./auth')
const login = require('./login')
const check = require('./check')
const listing = require('./listing')
const authMiddleware = require('./authMiddleware/auth')
const api = require('express').Router()

api.use('/atom', atom)
api.use('/cute', cute)
api.use('/auth', auth)
api.use('/login', login)
api.use('/check', check)

api.use('/listing', authMiddleware)
api.use('/listing', listing)

module.exports = api