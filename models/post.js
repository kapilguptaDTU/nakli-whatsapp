  
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
 
 users: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   author:String
});

module.exports = mongoose.model("Post", postSchema);

