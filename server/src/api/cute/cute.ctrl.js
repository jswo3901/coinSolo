const Cute = require('db/models/cute')

exports.postCute = (req, res) => {
  const {
    cuteValue
  } = req.body

  const newCute = new Cute({
    cuteValue: cuteValue
  })

  newCute.save((err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('굿 큐트')
    }
  })
}