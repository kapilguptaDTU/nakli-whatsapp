var express = require('express'),
    path = require('path'),
    bodyparser = require('body-parser'),
    mongoose = require("mongoose"),
    Comment = require("./models/comment"),
    Employee = require("./models/employee.model");
    Post = require("./models/post"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Message=require("./models/message"),
    Sequence=require("./models/sequence"),
    
    HashMap=require('hashmap');





app.use(bodyparser.urlencoded({
    extended: true
}));


var commentRoutes = require("./routes/comments"),
    postRoutes = require("./routes/posts"),
    indexRoutes = require("./routes/index"),
    employeeRoutes = require("./routes/employees")
    userRoutes = require("./routes/users")
    
mongoose.connect('mongodb+srv://kapil:Kapildev@1@cluster0-3p0rc.mongodb.net/test', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

// mongodb+srv://kapil:<password>@cluster0-3p0rc.mongodb.net/test
// mongoose.connect('mongodb://localhost:27017/MongoApp_V6', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }, (err) => {
//     if (!err) {
//         console.log('MongoDB connection successful')
//     } else {
//         console.log('Error in DB connection' + err)
//     }


// });

mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/", postRoutes);
app.use("/", commentRoutes);
app.use("/", employeeRoutes);
app.use("/", userRoutes);



// LISTENING AT 3000 //

// app.listen(3000, () => {
//     console.log('Express server started at port 3000');

// });


app.listen(process.env.PORT,process.env.IP);
console.log("DBMS V8 started");
