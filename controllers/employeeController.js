
const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Employee=mongoose.model('Employee');

router.get('/',(req,res)=>{
// res.json('HI there');
res.render("employee/addOrEdit",{
viewTitle:"Insert Employee"
});
});

router.post('/',(req,res)=>{
console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
console.log(req.body._id);
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
    console.log("Emp"+employee);
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
         else{
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

router.get('/list',(req,res)=>{
// res.json('from list');
Employee.find((err,docs)=>{
if(!err)
{
    res.render("employee/list",{
        list:docs
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


router.get('/:id',(req,res)=>{
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
    
router.get('/delete/:id',(req,res)=>{
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


module.exports = router;



