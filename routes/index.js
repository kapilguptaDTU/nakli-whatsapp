var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Employee = require("../models/employee.model");

//  ===========
// AUTH ROUTES
//  ===========


router.get("/2048", function (req, res) {

    User.find({}, (err, docs) => {
        if (!err) {
            res.render("2048.ejs", {
                users: docs
            });
        } else {
            console.log('Error while retrieving user list :' + err);

        }
    }).lean();
});
router.get("/snakes", function (req, res) {
    res.render("snakesandladders.ejs");
})


module.exports = router;