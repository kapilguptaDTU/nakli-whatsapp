const mongoose=require('mongoose');
require('./employee.model');
// require('./comment');
require('./post');


mongoose.connect('mongodb://localhost:27017/V2EmployeeDB',{useNewUrlParser: true},(err)=>{
   if(!err){console.log('MongoDB connection successful')}
   else{console.log('Error in DB connection'+err)}


});

