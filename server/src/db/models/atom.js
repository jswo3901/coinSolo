const mongoose = require('mongoose')
const { Schema } = mongoose

const atomSchema = new Schema({
  contents: String
})

module.exports = mongoose.model('atom', atomSchema)