const listing = require('express').Router()
const listingCtrl = require('./listing.ctrl')

listing.get('/', listingCtrl.list)
listing.post('/:username', listingCtrl.assignAdmin)
module.exports = listing