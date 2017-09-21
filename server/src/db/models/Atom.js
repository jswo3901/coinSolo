const mongoose = require('mongoose')
const { Schema } = mongoose

const Atom = new Schema({
  contents: String
})

module.exports = mongoose.model('Atom', Atom)