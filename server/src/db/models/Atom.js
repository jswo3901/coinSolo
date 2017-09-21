const mongoose = require('mongoose')
const { Schema } = mongoose

const Atom = new Schema({
  name: String
})

module.exports = mongoose.model('Atom', Atom)