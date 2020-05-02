var express = require("express");
var router = express.Router({
    mergeParams: true
});
var User = require("../models/user");
var Employee = require("../models/employee.model");
var Post = require("../models/post");
var Comment = require("../models/comment");




// ...................................................

// POST ROUTES START //

// ...................................................


router.get('/posts', (req, res) => {
    // res.json('from list');
    Post.find({}, (err, docs) => {
        if (!err) {
            res.render("post/allposts", {
                posts: docs
            });
        } else {
            console.log('Error while retrieving post list :' + err);

        }
    }).lean();
});


router.get("/user/:id/post/new", function (req, res) {
    // find employee by id
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.render("post/new", {
                user: user
            });
        }
    })
});

router.post("/user/:id/post", function (req, res) {
    //lookup employee using ID
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/users");
        } else {
            Post.create(req.body.post, function (err, post) {
                if (err) {
                    console.log(err);
                } else {
                    
                    user.posts.push(post);
                    post.users.push(user);
                    // console.log("user");

                    post.author = user.username;
                    // console.log(employee.fullName);

                    post.save();
                    console.log(post.author);
                    user.save();
                    res.redirect('/user/' + user._id);
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
router.get("/post/:id", function (req, res) {
    var allComments = [];
    var numReplies = 0;
    //find the campground with provided ID
    Post.findById(req.params.id).populate("comments").exec(function (err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            foundPost.comments.forEach(function (childofchild) {
                // console.log("ccc" + childofchild._id + "ccccccccccccccccccccccccccccccccccccccccccccc");
                Comment.findById(childofchild._id).populate("childComments").exec(function (err, foundReply) {
                    if (err) {
                        console.log(err);
                    } else {
                        foundReply.save();
                        numReplies++;
                        allComments.push(foundReply);
                        // console.log("hello" + numReplies);

                    }
                });

            });

            function a() {
                res.render("post/show3", {
                    post: foundPost,
                    replies: allComments,
                    numReplies: numReplies
                }), 1000
            };
            console.log(numReplies);
            setTimeout(a, 100);
        }
    });
});



router.get('/post/:id/update', (req, res) => {
    // res.json('HI there');
    console.log("getting post/:id/update");
    Post.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("post/edit", {
                viewTitle: "Update Posts",
                post: doc
            });
        }
    }).lean();
});


// UPDATE CAMPGROUND ROUTE
router.post("/post/:id", function (req, res) {
    // find and update the correct campground
    Post.findByIdAndUpdate(req.params.id, req.body.post, function (err, updatedPost) {
        if (err) {
            res.send('error during update');
        } else {
            //redirect somewhere(show page)
            res.redirect("/post/" + req.params.id);
        }
    });
});



router.get('/post/delete/:id', (req, res) => {


    Post.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {

            res.redirect('/posts');
        } else {
            console.log('Error in post delete:' + err);
            res.redirect('/users');
        }
    }).lean();
});


// ...................................................

// POST ROUTES END //

// ...................................................

module.exports = router;