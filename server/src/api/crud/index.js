const crud = require('express').Router()
const crudCtrl = require('./crud.ctrl')

crud.route('/')
  .post(crudCtrl.postCrud)
  .get(crudCtrl.getCrud)

crud.route('/:id')
  .delete(crudCtrl.deleteCrud)
  .put(crudCtrl.putCrud)

module.exports = crud