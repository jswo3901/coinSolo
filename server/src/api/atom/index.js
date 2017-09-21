const atom = require('express').Router()
const atomCtrl = require('./atom.ctrl')

atom.route('/')
  .post(atomCtrl.postAtom)

module.exports = atom