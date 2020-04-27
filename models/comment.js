  
var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: String,
    posts: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Post"
        }
     ],

     parentComments:[
        {
            text: String,
            author: String,                
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ],
     childComments:[
        {
           
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment",
           text: String,
           author: String
        }
     ],
     
});

module.exports = mongoose.model("Comment", commentSchema);