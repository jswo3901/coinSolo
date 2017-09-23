const mongoose = require('mongoose')
const { Schema } = mongoose

const cuteSchema = new Schema({
  cuteValue: String
})

module.exports = mongoose.model('cute', cuteSchema)