const mongoose = require('mongoose')

module.exports = (function () {
  mongoose.Promise = global.Promise
  return {
    connect() {
      return mongoose.connect('mongodb://localhost/coinApp', {
        useMongoClient: true
      }).then(
        console.log('mongodb is connected!!')
      ).catch(e => {
        console.error(e)
      })
    }
  }
})()