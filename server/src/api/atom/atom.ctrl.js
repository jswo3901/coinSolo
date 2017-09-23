const Atom = require('db/models/atom')

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

exports.getAtom = (req, res) => {
  Atom.find({}, {_id: 0, contents: 1}, (err, atoms) => {
    if (err) {
      console.error(err)
    } else {
      res.json(atoms)
    }
  })
}