// import { extname } from 'path';

// require('./models/db');

const express=require('express');
const path=require('path');
// const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');
// const employeeController=require('./controllers/employeeController');
var  mongoose    = require("mongoose"),
Comment     = require("./models/comment"),
Employee        = require("./models/employee.model");
Post  = require("./models/post");


var app=express();
app.use(bodyparser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://localhost:27017/MongoApp_V3',{useUnifiedTopology: true,useNewUrlParser: true},(err)=>{
   if(!err){console.log('MongoDB connection successful')}
   else{console.log('Error in DB connection'+err)}


});

mongoose.set('useFindAndModify', false);
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));


app.get("/2048",function(req,res){
 
    Employee.find({},(err,docs)=>{
        if(!err)
        {
            res.render("2048.ejs",{
                employees:docs
            });
        }
        else{
            console.log('Error while retrieving employee list :'+err);
        
        }
        }).lean();
   });
app.get("/snakes",function(req, res) {
       res.render("snakesandladders.ejs");
})
  


//..............................................

//..............................................

// start employee routes

//..............................................

   
app.get('/',(req,res)=>{
    // res.json('from list');
    Employee.find({},(err,docs)=>{
    if(!err)
    {
        res.render("employee/list",{
            employees:docs
        });
    }
    else{
        console.log('Error while retrieving employee list :'+err);
    
    }
    }).lean();
}) ;
    
// GET FORM TO INSERT/UPDATE
 
app.get('/employee',(req,res)=>{
    // res.json('HI there');
    res.render("employee/addOrEdit",{
    viewTitle:"Insert Employee",
    employee:req.body
                     
    });
    });
    

// POST REQ FROM THE NEW FORM    

app.post('/employee',(req,res)=>{
    // console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    // console.log(req.body._id);
    if(req.body._id=='')
    insertRecord(req,res);
    else
    updateRecord(req,res);
    });


function insertRecord(req,res){
        var employee=new Employee();
        // employee._id=req.body._id;
        employee.fullName=req.body.fullName;
        employee.email=req.body.email;
        employee.mobile=req.body.mobile;
        employee.city=req.body.city;
        // console.log("Emp"+employee);
        // console.log("Employee id="+req.body._id);
        // console.log("req.body.email="+req.body.email);
    
    
    employee.save((err,doc)=>
    {
            if(!err)
            res.redirect('employee/list');
            else{
                if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle:"Insert Employee",
                    employee:req.body
                    });
                    // console.log(viewTitile);
                }
                else
                {
                console.log('Error during record insertion : '+err);
                res.redirect('employee/list');
                
                }
                }
    });
    
}


function updateRecord(req,res){
        Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
            if(!err)
            {
                res.redirect('employee/list');
            }
             else
             {
                 if(err.name=='ValidationError'){
                     handleValidationError(err,req.body);
                     res.render("employee/addOrEdit",{
                         viewTitle:'Update Employee',
                         employee:req.body
                     });
                 }
    
                 else{
                      console.log('Error during record update:'+err);
                    //   console.log('Error during record insertion : '+err);
                      res.redirect('employee/list');
                  
                    }
            }
        });
    
}


// GET LIST OF ALL EMPLOYEES
    
app.get('/employee/list',(req,res)=>{
    // res.json('from list');
    Employee.find({},(err,docs)=>{
    if(!err)
    {
        res.render("employee/list",{
            employees:docs
        });
    }
    else{
        console.log('Error while retrieving employee list :'+err);
    
    }
    }).lean();
}) ;
    
    
    
    
    
    
    
function handleValidationError(err,body){
        console.log("inside handleValidationError");
        for(field in err.errors)
        {
            switch(err.errors[field].path){
                case 'fullName':
                body['fullNameError']=err.errors[field].message;
                break;
                case 'email':
                body['emailError']=err.errors[field].message;
                break;
                default:
                break;
            }
        }
    }

// UPDATE EMPLOYEE //    

app.get('/employee/:id/update',(req,res)=>{
        // res.json('HI there');
        console.log("getting /:id");
        Employee.findById(req.params.id,(err,doc)=>{
             if(!err)
             {
                 res.render("employee/addOrEdit",{
                     viewTitle:"Update Employees",
                     employee:doc
                 });
             }
        }).lean();
});

        
// EMPLOYEE SHOW PAGE

// SHOW - shows more info about one EMPLOYEE
app.get("/employee/:id", function(req, res){
    //find the campground with provided ID
    Employee.findById(req.params.id).populate("posts").exec(function(err, foundEmployee){
        if(err){
            console.log(err);
        } else {
            // console.log(foundEmployee)
            //render show template with that campground
            res.render("employee/showproper", {employee: foundEmployee});
        }
    });
});





//  DELETE       // 


app.get('/employee/delete/:id',(req,res)=>{
        Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
            if(!err)
            {res.redirect('/employee/list');
            }
            else{
                console.log('Error in employee delete:'+err);
                res.redirect('/employee/list');
            }
       }).lean();
       });
    
// ...................................................
       
// EMPLOYEE ROUTES END //

// ...................................................





// ...................................................
       
// POST ROUTES START //

// ...................................................

   
app.get('/posts',(req,res)=>{
    // res.json('from list');
    Post.find({},(err,docs)=>{
    if(!err)
    {
        res.render("post/list",{
            posts:docs
        });
    }
    else{
        console.log('Error while retrieving post list :'+err);
    
    }
    }).lean();
}) ;
 

app.get("/employee/:id/post/new", function(req, res){
    // find employee by id
    Employee.findById(req.params.id, function(err, employee){
        if(err){
            console.log(err);
        } else {
             res.render("post/new", {employee: employee});
        }
    })
});

app.post("/employee/:id/post", function(req, res){
   //lookup employee using ID
   Employee.findById(req.params.id, function(err, employee){
       if(err){
           console.log(err);
           res.redirect("/employee/list");
       } else {
        Post.create(req.body.post, function(err, post){
           if(err){
               console.log(err);
           } else {
               employee.posts.push(post);
               post.employees.push(employee);
               console.log("employee");
               
               post.author=employee.fullName;
               console.log(employee.fullName);
               
               post.save();
               console.log(post.author);
               employee.save();
               res.redirect('/employee/' + employee._id);
           }
        });
       }
   });
   //create new post
   //connect new post to employee
   //redirect employee show page
});

     
// POST SHOW PAGE

// SHOW - shows more info about one POST
app.get("/post/:id", function(req, res){
    //find the campground with provided ID
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            // console.log(foundPost.comments);
            // console.log(foundPost.employees[0]);
            
            //render show template with that campground
            foundPost.comments.forEach(function(childofchild){ 
            Comment.findById(childofchild).populate("childComments").exec(function(err, foundComment){
                if(err){
                    console.log(err);
                } else {
                    // console.log(foundPost.comments);
                    // console.log(foundPost.employees[0]);
                    
                    //render show template with that campground
                    foundComment.populate("childComments");
                    foundComment.save();
                    // res.render("comment/show", {parentComment: foundComment});
                    // res.render("post/show",{post:foundPost});
                }
            });
            
        });
            
            
            res.render("post/show", {post: foundPost});
        }
    });
});



app.get('/post/:id/update',(req,res)=>{
    // res.json('HI there');
    console.log("getting post/:id/update");
    Post.findById(req.params.id,(err,doc)=>{
         if(!err)
         {
             res.render("post/edit",{
                 viewTitle:"Update Posts",
                 post:doc
             });
         }
    }).lean();
});


// UPDATE CAMPGROUND ROUTE
app.post("/post/:id", function(req, res){
    // find and update the correct campground
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
       if(err){
           res.send('error during update');
       } else {
           //redirect somewhere(show page)
           res.redirect("/post/" + req.params.id);
       }
    });
});



app.get('/post/delete/:id',(req,res)=>{

    
    Post.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err)
        {  
        //      console.log('sadasdassdaaddddddddddddddddddddddddddddddddddddd'+doc);
        // console.log('sadasdassdaaddddddddddddddddddddddddddddddddddddd'+doc.employees);
        
        // console.log('sadasdassdaaddddddddddddddddddddddddddddddddddddd'+doc.employee);
        
        res.redirect('/employee/'+doc.employees[0]);
        }
        else{
            console.log('Error in post delete:'+err);
            res.redirect('/employee/list');
        }
   }).lean();
   });


// ...................................................
       
// POST ROUTES END //

// ...................................................



// ...................................................
       
// COMMENT ROUTES START //

// ...................................................



app.get("/post/:id/comment/new", function(req, res){
    // find post by id
    console.log("finding post/id/comment/new")
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
             res.render("comment/new", {post: post});
        }
    })
});

app.post("/post/:id/comment", function(req, res){
    //lookup employee using ID
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            res.redirect("/employee/list");
        } else {
         Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                post.comments.push(comment);
             //    console.log("commenttttttttttttttttttttttttttttttttttttttttt"+comment);
             //    console.log("postssssssssDDDDDDDDDDDDDDDDDDDD"+post);
                comment.posts.push(post);
                post.save();
                comment.save();
         //    console.log(post.comments);
                res.redirect('/post/' + post._id);
             }
         });
        }
    });
    //create new post
    //connect new post to employee
    //redirect employee show page
 });
 



app.get('/comment/:id/update',(req,res)=>{
    // res.json('HI there');
    console.log("getting comment/:id/update");
    Comment.findById(req.params.id,(err,doc)=>{
         if(!err)
         {
             res.render("comment/edit",{
                 viewTitle:"Update Comment",
                 comment:doc,
                 
             });
         }
    }).lean();
});


// UPDATE COMMENT ROUTE
app.post("/comment/:id", function(req, res){
    // find and update the correct campground
    Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, updatedComment){
       if(err){
           res.send('error during comment update');
       } else {
           //redirect somewhere(show page)
           res.redirect("/post/" + updatedComment.posts[0]);
       }
    });
});



app.get('/comment/delete/:id',(req,res)=>{

    
    Comment.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err)
        {   console.log('comment delete route'+doc);
        // console.log('sadasdassdaaddddddddddddddddddddddddddddddddddddd'+doc.employees);
        
        // console.log('sadasdassdaaddddddddddddddddddddddddddddddddddddd'+doc.employee);
        
        res.redirect('/post/'+doc.posts[0]);
        }
        else{
            console.log('Error in comment delete:'+err);
            res.redirect('/employee/list');
        }
   }).lean();
   });


   app.get('/comment/:id/reply',(req,res)=>{
    // res.json('HI there');
    console.log("getting comment/:id/reply");
    Comment.findById(req.params.id,(err,doc)=>{
         if(!err)
         {
             res.render("comment/replyoncomment",{
                 viewTitle:"Update Comment",
                 parentComment:doc,
                 
             });
         }
    }).lean();
});




app.post("/comment/:id/replyoncomment", function(req, res){
    //lookup employee using ID
    Comment.findById(req.params.id, function(err, parentComment){
        if(err){
            console.log(err);
            res.redirect("/employee/list");
        } else {
         Comment.create(req.body.comment, function(err, childComment){
            if(err){
                console.log(err);
            } else {
             //    console.log("commenttttttttttttttttttttttttttttttttttttttttt"+comment);
             //    console.log("postssssssssDDDDDDDDDDDDDDDDDDDD"+post);
             childComment.parentComments.push(parentComment);
             childComment.posts.push(parentComment.posts[0]);
             childComment.populate("ChildComments");
             
             parentComment.childComments.push(childComment);
                
             parentComment.childComments.forEach(function(childofchild){ 
                //  childofchild.populate("ChildComments");
                //  childofchild.save();
                // Comment.findById(childofchild, function(err, foundChild){

                // });
       
       
                console.log("cc"+childofchild);
             });

             
             childComment.save();
                parentComment.save();
         //    console.log(post.comments);
                res.redirect('/comment/' + parentComment._id);
             }
         });
        }
    });
    //create new reply
    //connect new reply to comment and post
    //redirect post show page
 });
 

// SHOW - shows more info about one POST
app.get("/comment/:id", function(req, res){
    //find the campground with provided ID
    Comment.findById(req.params.id).populate("childComments").exec(function(err, parentComment){
        if(err){
            console.log(err);
        } else {
            // console.log(foundPost.comments);
            // console.log(foundPost.employees[0]);
            
            //render show template with that campground
            // foundComment.populate("childComments");
            // foundComment.save();
            res.render("comment/show", {parentComment: parentComment});
        }
    });
});







// LISTENING AT 3000 //

app.listen(3000,()=>{
console.log('Express server started at port 3000');

});

