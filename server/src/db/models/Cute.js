const mongoose = require('mongoose')
const { Schema } = mongoose

const Cute = new Schema({
  cuteValue: String
})

module.exports = mongoose.model('Cute', Cute)