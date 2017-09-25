const crud = require('express').Router()
const crudCtrl = require('./crud.ctrl')

crud.route('/')
  .post(crudCtrl.post)
  .get(crudCtrl.get)

crud.route('/:id')
  .delete(crudCtrl.delete)
  .put(crudCtrl.put)

module.exports = crud