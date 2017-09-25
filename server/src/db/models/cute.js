const mongoose = require('mongoose')
const { Schema } = mongoose

const cuteSchema = new Schema({
  content: String
}, {
  versionKey: false
})

module.exports = mongoose.model('cute', cuteSchema)