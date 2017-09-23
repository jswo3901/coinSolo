const atom = require('express').Router()
const atomCtrl = require('./atom.ctrl')

atom.route('/')
  .post(atomCtrl.postAtom)
  .get(atomCtrl.getAtom)

atom.route('/:id')
  .delete(atomCtrl.deleteAtom)

module.exports = atom