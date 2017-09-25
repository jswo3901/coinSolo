const mongoose = require('mongoose')
const { Schema } = mongoose

const crudSchema = new Schema({
  content: String
}, {
  versionKey: false
})

module.exports = mongoose.model('crud', crudSchema)