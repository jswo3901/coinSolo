const Crud = require('db/models/crud')

exports.post = (req, res) => {
  const newCrud = new Crud()
  newCrud.content = req.body.content
  newCrud.save((err) => {
    if (err) return console.error(err)
  })
}

exports.get = (req, res) => {
  Crud.find({}, {_id: 1, content: 1}, (err, cruds) => {
    if (err) {
      console.error(err)
    } else {
      res.json(cruds)
    }
  })
}

exports.delete = (req, res) => {
  Crud.remove({_id: req.params.id}, (err) => {
    if (err) return console.error(err)
  })
}

exports.put = (req, res) => {
  const content = req.body.content
  Crud.findById({_id: req.params.id}, (req, crud) => {
    crud.content = content
    crud.save((err) => {
      if (err) return console.error(err)
    })
  })
}