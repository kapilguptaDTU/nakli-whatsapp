var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var sequenceSchema = new mongoose.Schema({
    n:String,
    v:String
});


module.exports = mongoose.model('Sequence', sequenceSchema);