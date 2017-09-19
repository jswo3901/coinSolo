const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    data: Object,
});
module.exports = mongoose.model('User', userSchema);
//User exports하면 자동으로 users라는 컬렉션 생긴다. User=>users로 자동변형