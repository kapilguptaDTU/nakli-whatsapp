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

    const server = require('http').Server(app)
    const io = require('socket.io')(server)
    



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

User.find({}, (err, docs) => {
    if (!err) {

global.globalUsers=docs;
    }
});


app.post("/user/:id/chat",isLoggedIn, function (req, res) {

    // User.findById(req.params.id).populate("posts").exec(function (err, reciever) {
    //     var flag = 0;
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         var sender = req.user;

    //         var senderName = req.user.username;

    //         var recieverName = reciever.username;
    //         console.log(req.body.c.chat + "aaaa");

    //         function findObjectByKey(array, key, value) {
    //             for (var j = 0; j < array.length; j++) {
    //                 if (array[j][key] === value) {
    //                     return array[j];
    //                 }
    //             }
    //             return null;
    //         }

    //         var obj = findObjectByKey(sender.messages, 'n', recieverName);

    //         if (obj == null) {
    //             sender.messages.push({
    //                 n: recieverName,
    //                 v: ''
    //             });
    //             reciever.messages.push({
    //                 n: senderName,
    //                 v: ''
    //             });

    //             sender.sequence.push({
    //                 n: recieverName,
    //                 v: ''
    //             });
    //             reciever.sequence.push({
    //                 n: senderName,
    //                 v: ''
    //             });
    //         }

    //         obj = findObjectByKey(sender.messages, 'n', recieverName);
    //         var obj2 = findObjectByKey(reciever.messages, 'n', senderName);
    //         var objstring = findObjectByKey(sender.sequence, 'n', recieverName);
    //         var objstring2 = findObjectByKey(reciever.sequence, 'n', senderName);

    //         obj.v = obj.v + ',' + req.body.c.chat;

    //         obj2.v = obj2.v + ',' + req.body.c.chat;


    //         objstring.v = objstring.v + ',sent';

    //         objstring2.v = objstring2.v + ',recieved';

    //         function findObjectIdByKey(array, key, value) {
    //             for (var j = 0; j < array.length; j++) {
    //                 if (array[j][key] === value) {
    //                     return j;
    //                 }
    //             }
    //             return -1;
    //         }
    //         var index = findObjectIdByKey(sender.messages, 'n', recieverName);
    //         if (index != -1) {
    //             sender.messages[index].v = obj.v;
    //         }

    //         var index2 = findObjectIdByKey(reciever.messages, 'n', senderName);
    //         if (index2 != -1) {
    //             reciever.messages[index2].v = obj2.v;
    //         }

    //         var index3 = findObjectIdByKey(sender.sequence, 'n', recieverName);
    //         if (index3 != -1) {
    //             sender.sequence[index].v = objstring.v;
    //         }

    //         var index4 = findObjectIdByKey(reciever.sequence, 'n', senderName);
    //         if (index4 != -1) {
    //             reciever.sequence[index4].v = objstring2.v;
    //         }

    //         obj = findObjectByKey(sender.messages, 'n', recieverName);
    //         objstring = findObjectByKey(sender.sequence, 'n', recieverName);

    //         function a() {
    //             sender.save();
    //             reciever.save();
    //             res.redirect("/user/" + reciever._id + "/chat")
    //             io.emit('room-created');

    //         };
    //         setTimeout(a, 1000);
    //     }
    // });


});

app.get("/user/:id/chat",isLoggedIn, function (req, res) {
    //find the campground with provided ID


    global.currentwala=req.user;
    // console.log(globalUsers);
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
                console.log('sender.messages[recievername] is null');
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
                res.render("user/asocketchat", {
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





app.use("/", indexRoutes);
app.use("/", postRoutes);
app.use("/", commentRoutes);
app.use("/", employeeRoutes);
app.use("/", userRoutes);



// LISTENING AT 3000 //

// server.listen(3000, () => {
//     console.log('Express server started at port 3000');

// });

server.listen(process.env.PORT,process.env.IP);
console.log("DBMS V8 started");
  

io.on('connection', socket => {

    // socket.broadcast.emit('user-connected')

    socket.on('connection', () => {


        console.log("hello hi bye bye"); 
         
    });


  socket.on('room-created', () => {

    console.log("script has been initiated. user connected");
    
});
socket.on('user-opened-chat', (rec,sen) => {
    //   socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
socket.join('/user/'+rec+'/chat')
// console.log('sender-----------/user/'+sen+'/chat');
// console.log('reciever-----------/user/'+rec+'/chat');
    
    socket.to('/user/'+sen+'/chat').broadcast.emit('reciever-joined-message')
})

    // socket.on('new-user', (room, name) => {
    //   socket.join(room) 
    //   rooms[room].users[socket.id] = name
    //   socket.to(room).broadcast.emit('user-connected', name)
    // })
    socket.on('send-chat-message', (rec,sen, message) => {
    //   socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
    // User.findById(sen).populate("posts").exec(function (err, reciever) {
    
    //     global.send=reciever;
    
    // });
    // console.log(rec+"rec")
    // console.log(sen+"sen")
    
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccc/user/'+sen+'/chat');
    socket.to('/user/'+sen+'/chat').broadcast.emit('chat-message', { message: message, rec:rec,sen:sen})

    User.findById(rec,function (err, reciever) {
        // console.log(rec+"rec")
        // console.log(sen+"sen")
        // console.log(reciever+"reciever")
           
        // console.log(reciever)
        // console.log(rec) 
        
        var flag = 0;
        if (err) {
            console.log(err);
        } else {
            var sender = currentwala;

            var senderName = currentwala.username;

            var recieverName = reciever.username;
            // reciever=rec;
            console.log(message + "aaaa"+senderName+" "+recieverName);

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

            obj.v = obj.v + ',' + message;

            obj2.v = obj2.v + ',' + message;


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
                sender.sequence[index3].v = objstring.v;
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
                // res.redirect("/user/" + reciever._id + "/chat")
                // io.emit('room-created');
console.log("chuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
            };
            setTimeout(a, 2000);
        }
    });


})

    socket.on('disconnect', () => {
      
        socket.broadcast.emit('user-disconnected','abc')
        
      
    })
  })
  
  function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
      if (room.users[socket.id] != null) names.push(name)
      return names
    }, [])
  }



  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}