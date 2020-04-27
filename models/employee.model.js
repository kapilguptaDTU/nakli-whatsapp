const mongoose=require('mongoose');



var employeeSchema=new mongoose.Schema({
    fullName:{
        type:String,
       required:'Please enter your Name'
    },
    email:{
        type:String
        // required:true
   
    },
    mobile:{
        type:String 
    },
    city:{
        type:String
    },
    state:{
        type:String
    } ,
    highscore:{
        type:String,
        default:'0'
    } ,
       posts: [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Post"
          }
       ]
                
});


employeeSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return emailRegex.test(val);
},'Invalid e-mail.');


module.exports=mongoose.model('Employee',employeeSchema);