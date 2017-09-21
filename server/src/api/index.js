const atom = require('./atom')

const api = require('express').Router()

api.use('/atom', atom)

module.exports = api