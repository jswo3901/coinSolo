const mongoose = require('mongoose')
const { Schema } = mongoose

const atomSchema = new Schema({
  contents: String
}, {
  versionKey: false
})

module.exports = mongoose.model('atom', atomSchema)