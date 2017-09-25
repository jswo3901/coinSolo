const Cute = require('db/models/cute')

exports.postCute = (req, res) => {
  const newCute = new Cute()
  newCute.content = req.body.content
  newCute.save((err) => {
    if (err) return console.error(err)
  })
}

exports.getCute = (req, res) => {
  Cute.find({}, {_id: 1, content: 1}, (err, cutes) => {
    if (err) {
      console.error(err)
    } else {
      res.json(cutes)
    }
  })
}

exports.deleteCute = (req, res) => {
  Cute.remove({_id: req.params.id}, (err) => {
    if (err) return console.error(err)
  })
}

exports.putCute = (req, res) => {
  const content = req.body.content
  Cute.findById({_id: req.params.id}, (req, cute) => {
    cute.content = content
    cute.save((err) => {
      if (err) return console.error(err)
    })
  })
}