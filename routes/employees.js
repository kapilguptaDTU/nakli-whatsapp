var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Employee = require("../models/employee.model");
var Post = require("../models/post");
var Comment = require("../models/comment");



//..............................................

// start employee routes

//..............................................



// GET FORM TO INSERT/UPDATE

router.get('/employee', (req, res) => {
    // res.json('HI there');
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee",
        employee: req.body

    });
});


// POST REQ FROM THE NEW FORM    

router.post('/employee', (req, res) => {
    // console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    // console.log(req.body._id);
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    // employee._id=req.body._id;
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    // console.log("Emp"+employee);
    // console.log("Employee id="+req.body._id);
    // console.log("req.body.email="+req.body.email);


    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
                // console.log(viewTitile);
            } else {
                console.log('Error during record insertion : ' + err);
                res.redirect('employee/list');

            }
        }
    });

}


function updateRecord(req, res) {
    Employee.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            } else {
                console.log('Error during record update:' + err);
                //   console.log('Error during record insertion : '+err);
                res.redirect('employee/list');

            }
        }
    });

}


// GET LIST OF ALL EMPLOYEES

router.get('/employee/list', (req, res) => {
    // res.json('from list');
    Employee.find({}, (err, docs) => {
        if (!err) {
            res.render("employee/list", {
                employees: docs
            });
        } else {
            console.log('Error while retrieving employee list :' + err);

        }
    }).lean();
});







function handleValidationError(err, body) {
    console.log("inside handleValidationError");
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

// UPDATE EMPLOYEE //    

router.get('/employee/:id/update', (req, res) => {
    // res.json('HI there');
    console.log("getting /:id");
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employees",
                employee: doc
            });
        }
    }).lean();
});


// EMPLOYEE SHOW PAGE

// SHOW - shows more info about one EMPLOYEE
router.get("/employee/:id", function (req, res) {
    //find the campground with provided ID
    Employee.findById(req.params.id).populate("posts").exec(function (err, foundEmployee) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundEmployee)
            //render show template with that campground
            res.render("employee/showproper", {
                employee: foundEmployee
            });
        }
    });
});





//  DELETE       // 


router.get('/employee/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log('Error in employee delete:' + err);
            res.redirect('/employee/list');
        }
    }).lean();
});

// ...................................................

// EMPLOYEE ROUTES END //

// ...................................................




















module.exports = router;