const Atom = require('db/models/Atom')

exports.postAtom = (req, res) => {
  const {
    contents
  } = req.body

  const newAtom = new Atom({
    contents: contents
  })

  newAtom.save((err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('굿')
    }
  })
}