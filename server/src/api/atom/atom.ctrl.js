const Atom = require('db/models/Atom')

exports.postAtom = (req, res) => {
  const {
    nameInput
  } = req.body

  const newAtom = new Atom({
    name: nameInput
  })

  newAtom.save((err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('굿')
    }
  })
}