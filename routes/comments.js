var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Employee = require("../models/employee.model");
var Post = require("../models/post");
var Comment = require("../models/comment");

// ...................................................

// COMMENT ROUTES START //

// ...................................................

router.get('/comments', (req, res) => {
    // res.json('from list');
    Comment.find({}, (err, docs) => {
        if (!err) {
            res.render("comment/list", {
                comments: docs
            });
        } else {
            console.log('Error while retrieving post list :' + err);

        }
    }).lean();
});


router.get("/post/:id/comment/new", function (req, res) {
    // find post by id
    console.log("finding post/id/comment/new")
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err);
        } else {
            res.render("comment/new", {
                post: post
            });
        }
    })
});

router.post("/post/:id/comment", function (req, res) {
    //lookup employee using ID
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err);
            res.redirect("/users");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    post.comments.push(comment);
                    comment.posts.push(post);
                    post.save();
                    comment.save();
                    res.redirect('/post/' + post._id);
                }
            });
        }
    });
    //create new post
    //connect new post to employee
    //redirect employee show page
});




router.get('/comment/:id/update', (req, res) => {
    // res.json('HI there');
    console.log("getting comment/:id/update");
    Comment.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("comment/edit", {
                viewTitle: "Update Comment",
                comment: doc,

            });
        }
    }).lean();
});


// UPDATE COMMENT ROUTE
router.post("/comment/:id", function (req, res) {
    // find and update the correct campground
    Comment.findByIdAndUpdate(req.params.id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.send('error during comment update');
        } else {
            //redirect somewhere(show page)
            res.redirect("/post/" + updatedComment.posts[0]);
        }
    });
});



router.get('/comment/delete/:id', (req, res) => {


    Comment.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            console.log('comment delete route' + doc);
            res.redirect('/post/' + doc.posts[0]);
        } else {
            console.log('Error in comment delete:' + err);
            res.redirect('/users');
        }
    }).lean();
});


router.get('/comment/:id/reply', (req, res) => {
    // res.json('HI there');
    console.log("getting comment/:id/reply");
    Comment.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("comment/replyoncomment", {
                viewTitle: "Update Comment",
                parentComment: doc,

            });
        }
    }).lean();
});




router.post("/comment/:id/replyoncomment", function (req, res) {
    //lookup employee using ID
    Comment.findById(req.params.id, function (err, parentComment) {
        if (err) {
            console.log(err);
            res.redirect("/users");
        } else {
            Comment.create(req.body.comment, function (err, childComment) {
                if (err) {
                    console.log(err);
                } else {
                    childComment.parentComments.push(parentComment);
                    childComment.posts.push(parentComment.posts[0]);
                    childComment.populate("ChildComments");

                    parentComment.childComments.push(childComment);


                    childComment.save();
                    parentComment.save();
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
router.get("/comment/:id", function (req, res) {
    Comment.findById(req.params.id).populate("childComments").exec(function (err, parentComment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comment/show", {
                replies: parentComment
            });
        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;