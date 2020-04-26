  
var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   employees: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Employee"
       }
    ],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Post", postSchema);

