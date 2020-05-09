var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Employee = require("../models/employee.model");
var Post = require("../models/post");
var Comment = require("../models/comment");





router.get('/users', isLoggedIn, (req, res) => {
    // res.json('from list');
    User.find({}, (err, docs) => {
        if (!err) {



            res.render("user/list", {
                users: docs
            });
        } else {
            console.log('Error while retrieving user list :' + err);

        }
    }).lean();
});
router.get('/',isLoggedIn, (req, res) => {
    // res.json('from list');
    User.find({}, (err, docs) => {
        if (!err) {

global.globalUsers=docs;

            res.render("user/nakliWhatsapp", {
                users: docs
            });
        } else {
            console.log('Error while retrieving user list :' + err);

        }
    }).lean();
});


// router.get("/login", function (req, res) {
//     res.render("login");
// });



router.get('/chat', isLoggedIn, (req, res) => {
    // res.json('from list');
    User.find({}, (err, docs) => {
        if (!err) {



            res.render("user/listforchat", {
                users: docs
            });
        } else {
            console.log('Error while retrieving user list :' + err);

        }
    }).lean();
});



// EMPLOYEE SHOW PAGE

// SHOW - shows more info about one EMPLOYEE
router.get("/user/:id", isLoggedIn, function (req, res) {
    //find the campground with provided ID
    User.findById(req.params.id).populate("posts").exec(function (err, foundUser) {
        //     foundUser.messages['ron']='hermoine';
        //  console.log( foundUser.messages['ron']);
        //  console.log(foundUser);
        // foundUser.save();
        //  ['ron']='hermoine';
        var flag = 0;
        if (err) {
            console.log(err);
        } else {
            foundUser.friendName.forEach(function (friend) {
                if (friend == req.user.username) {
                    flag = 1;
                }
            });
            res.render("user/profilepage", {
                user: foundUser,
                allUsers:globalUsers,
                flag: flag
            });
        }
    });
});
router.get("/user/:id/friend", function (req, res) {
    //find the campground with provided ID
    User.findById(req.params.id).populate("posts").exec(function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            foundUser.friends.push(req.user._id);
            foundUser.friendName.push(req.user.username);

            req.user.friends.push(foundUser._id);
            req.user.friendName.push(foundUser.username);
            req.user.save();
            // console.log(req.user);
            foundUser.save();

            console.log("found" + foundUser);
            res.redirect("/user/" + foundUser._id);

        }
    });
});












router.get("/register", function (req, res) {
    res.render("user/register");
});
//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username,
        mobile: req.body.mobile,
        state: req.body.state,
        city: req.body.city,
        highscore: '0',
        profileImage:req.body.profileImage,
        description:req.body.description

    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });
});

// show login form
router.get("/login", function (req, res) {
    res.render("user/login");
});
// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function (req, res) {});

// logic route
router.get("/logout", function (req, res) {
    req.logout();
    console.log("succesfuly logged out");
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}






module.exports = router;