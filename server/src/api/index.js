const crud = require('./crud')
const auth = require('./auth')
const login = require('./login')
const check = require('./check')
const listing = require('./listing')
const authMiddleware = require('./authMiddleware/auth')
const api = require('express').Router()

api.use('/crud', crud)
api.use('/auth', auth)
api.use('/login', login)
api.use('/check', check)

api.use('/listing', authMiddleware)
api.use('/listing', listing)

module.exports = api