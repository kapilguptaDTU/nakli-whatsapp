var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var messagesSchema = new mongoose.Schema({
    n:String,
    v:String
});
    
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    mobile:{
        type:String 
    },
    city:{
        type:String
    },
    state:{
        type:String
    } ,
    profileImage:{
        type:String,
        default:"https://cdn.drawception.com/images/panels/2016/12-23/LzmGdeampF-4.png"
    } ,
    

    description:{
        type:String,
        default:"I love this app!!"
    
    },


    highscore:{
        type:String,
        default:'0'
    } ,
       posts: [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Post"
          }
       ],
       numPosts:{
        type:Number,
        default:0
    } ,
       
       comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ],
     friends: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        }
     ],
     friendName: [
        {
           type: String
        }
     ],
     messages:[
        {
            n:{
                type:String
            }
            ,
            v:
            {
                type:String
            }   
         }],
        sequence:[
            {
                n:{
                    type:String
                }
                ,
                v:
                {
                    type:String
                }
            } 
        ]
        
        

});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);