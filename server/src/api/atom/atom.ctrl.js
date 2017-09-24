const Atom = require('db/models/atom')

/* 
    POST /api/atom
    {
        contents
        
    }
*/


exports.postAtom = (req, res) => {
  const {
    contents
  } = req.body

  const newAtom = new Atom({
    contents: contents
  })

  newAtom.save((err) => {
    if (err) return console.error(err)
  })
}

exports.getAtom = (req, res) => {
  Atom.find({}, {_id: 1, contents: 1}, (err, atoms) => {
    if (err) {
      console.error(err)
    } else {
      res.json(atoms)
    }
  })
}

exports.deleteAtom = (req, res) => {
  Atom.remove({_id: req.params.id}, (err) => {
    if (err) return console.error(err)
  })
}