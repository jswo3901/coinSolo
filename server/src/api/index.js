const atom = require('./atom')
const cute = require('./cute')

const api = require('express').Router()

api.use('/atom', atom)
api.use('/cute', cute)

module.exports = api