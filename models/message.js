var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var messageSchema = new mongoose.Schema({
    n:String,
    v:String
});


module.exports = mongoose.model('Message', messageSchema);