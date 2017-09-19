const mongoose = require('mongoose')

module.exports = (function () {
  mongoose.Promise = global.Promise
  return {
    connect() {
      return mongoose.connect('mongodb://localhost/coinapp', {
        useMongoClient: true
      }).then(
        console.log('mongodb is connected!!')
      ).catch(e => {
        console.error(e)
      })
    }
  }
})()