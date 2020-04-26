  
var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: String,
    posts: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Post"
        }
     ]
});

module.exports = mongoose.model("Comment", commentSchema);