const User = require('db/models/User')

exports.postUser = (req, res) => {
  const {
    nameInput
  } = req.body

  const newUser = new User({
    name: nameInput
  })

  newUser.save((err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('굿')
    }
  })
}