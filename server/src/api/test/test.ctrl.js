exports.getTest = (req, res) => {
  res.send('get test')
}

exports.postTest = (req, res) => {
  res.send('nice post')
}

exports.getTestId = (req, res) => {
  res.send('get test id')
}

exports.dbTest = (req, res) => {
  User.find({ name: req.params.name }, (err, user) => {
    
    
  });
};