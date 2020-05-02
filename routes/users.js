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


router.post("/user/:id/chat", isLoggedIn, function (req, res) {

    User.findById(req.params.id).populate("posts").exec(function (err, reciever) {
        var flag = 0;
        if (err) {
            console.log(err);
        } else {
            var sender = req.user;

            var senderName = req.user.username;

            var recieverName = reciever.username;
            console.log(req.body.c.chat + "aaaa");

            function findObjectByKey(array, key, value) {
                for (var j = 0; j < array.length; j++) {
                    if (array[j][key] === value) {
                        return array[j];
                    }
                }
                return null;
            }

            var obj = findObjectByKey(sender.messages, 'n', recieverName);

            if (obj == null) {
                sender.messages.push({
                    n: recieverName,
                    v: ''
                });
                reciever.messages.push({
                    n: senderName,
                    v: ''
                });

                sender.sequence.push({
                    n: recieverName,
                    v: ''
                });
                reciever.sequence.push({
                    n: senderName,
                    v: ''
                });
            }

            obj = findObjectByKey(sender.messages, 'n', recieverName);
            var obj2 = findObjectByKey(reciever.messages, 'n', senderName);
            var objstring = findObjectByKey(sender.sequence, 'n', recieverName);
            var objstring2 = findObjectByKey(reciever.sequence, 'n', senderName);

            obj.v = obj.v + ',' + req.body.c.chat;

            obj2.v = obj2.v + ',' + req.body.c.chat;


            objstring.v = objstring.v + ',sent';

            objstring2.v = objstring2.v + ',recieved';

            function findObjectIdByKey(array, key, value) {
                for (var j = 0; j < array.length; j++) {
                    if (array[j][key] === value) {
                        return j;
                    }
                }
                return -1;
            }
            var index = findObjectIdByKey(sender.messages, 'n', recieverName);
            if (index != -1) {
                sender.messages[index].v = obj.v;
            }

            var index2 = findObjectIdByKey(reciever.messages, 'n', senderName);
            if (index2 != -1) {
                reciever.messages[index2].v = obj2.v;
            }

            var index3 = findObjectIdByKey(sender.sequence, 'n', recieverName);
            if (index3 != -1) {
                sender.sequence[index].v = objstring.v;
            }

            var index4 = findObjectIdByKey(reciever.sequence, 'n', senderName);
            if (index4 != -1) {
                reciever.sequence[index4].v = objstring2.v;
            }

            obj = findObjectByKey(sender.messages, 'n', recieverName);
            objstring = findObjectByKey(sender.sequence, 'n', recieverName);

            function a() {
                sender.save();
                reciever.save();
                res.redirect("/user/" + reciever._id + "/chat")

            };
            setTimeout(a, 1000);
        }
    });


});

router.get("/user/:id/chat", isLoggedIn, function (req, res) {
    //find the campground with provided ID

    console.log(globalUsers);
    User.findById(req.params.id).populate("posts").exec(function (err, reciever) {
        var flag = 0;
        if (err) {
            console.log(err);
        } else {

            var sender = req.user;
            var senderName = req.user.username;
            var recieverName = reciever.username;

            function findObjectByKey(array, key, value) {
                for (var j = 0; j < array.length; j++) {
                    if (array[j][key] === value) {
                        return array[j];
                    }
                }
                return null;
            }

            var obj = findObjectByKey(sender.messages, 'n', recieverName);

            if (obj == null) {
                console.log('NUMMMM');
                sender.messages.push({
                    n: recieverName,
                    v: ''
                });
                reciever.messages.push({
                    n: senderName,
                    v: ''
                });

                sender.sequence.push({
                    n: recieverName,
                    v: ''
                });
                reciever.sequence.push({
                    n: senderName,
                    v: ''
                });
            }

            obj = findObjectByKey(sender.messages, 'n', recieverName);
            var objstring = findObjectByKey(sender.sequence, 'n', recieverName);

            function a() {
                sender.save();
                reciever.save();
                var os = obj.v;
                var osa = objstring.v;

                var messagess = os.split(",");
                // console.log(os + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                var seq = osa.split(",");
                var i = messagess.length;
                res.render("user/chatboxmobile", {
                    user: reciever,
                    messagesy: messagess,
                    seq: seq,
                    allUsers:globalUsers,
                    i
                });
            };
            setTimeout(a, 1000);



        }
    });
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