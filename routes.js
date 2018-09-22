var express = require('express');
var User = require('./models/user');

var router = express.Router();

router.get("/", function(req,res) {
    var loggedIn = false;
    if (req.session.user) {
        loggedIn = true;
    }
    User.find().exec(function(err,users){
        console.log(users);
        res.render('home.ejs', {'userList': users, is_login : loggedIn });
    });
});

router.get("/login", function(req,res) {
    console.log(req.session);
    res.render("login.ejs");
});

router.get("/logout", function(req,res) {
    req.session.destroy();
    res.redirect('/');
    return;
});

router.post("/login", function(req,res) {
    let uname = req.body.username;
    let upass = req.body.password;
    User.findOne({ username : uname}).exec(function(err, user) {
        if (err) {
            console.log('failed to get data from db');
            res.send('Internal server error!');
            return;
        }
        if (user === null || user.password !== upass) {
            res.send('User or password was incorrect');
            return;
        }
        console.log("user instanceof User", user instanceof User);
        req.session.user = user;
        res.redirect('/edit');
        return;
    });
});

router.get("/signup", function(req,res) {
    res.render("signup.ejs");
});

router.post("/signup", function(req,res){
    console.log(req.body);
    let uname = req.body.username;
    let upass = req.body.password;
    User.findOne({ username : uname}).exec(function(err, user) {
        if(err) {
            res.send("Internal Error!");
            return;
        }
        if (user !== null) {
            res.send("User already exists!");
            return; 
        }
        let newUser = new User({username: uname, password: upass});
        newUser.save(function(err){
            if (err) {
                res.send("Internal Error could not create user!");
                return;
            }
            res.send("User created!");
        });
    });
});

router.get('/user/:username', function(req,res) {
    User.findOne({username: req.params.username}, function(err, user){
        if (err || !user) {
            console.log("Error",err);
            res.status(404).send("404");
            return;
        }
        res.render('profile.ejs', {user: user});
    });
});

router.get('/edit', function(req, res) {
    console.log(req.session)
    if (!req.session.user) {
        res.send('You must log in');
    }
    res.render('edit.ejs', { currentUser: req.session.user });
});

router.post('/edit', function(req, res) {
    let currentUser = req.session.user;
    if (!currentUser) {
        res.send('You must be logged in!');
        return;
    }
    console.log(currentUser);
    console.log("currentUser instanceof User", currentUser instanceof User);
    let newDisplayName = req.body.name;
    let newBio         = req.body.bio;
    
    if (!newDisplayName || !newBio) {
        res.send('Must provide both inputs');
        return;
    }
    req.session.user.bio = newBio;
    req.session.user.displayName = newDisplayName;
    console.log(Object.getOwnPropertyNames(req.session.user));
    User.update({_id: req.session.user._id}, {displayName: newDisplayName, bio: newBio }, function(err) {

        if(err) {
            res.send('Internal server error!');
            return;
        }
        res.send('Done!');
        return;
    });
});

router.get(function(){
    res.status(404).render("Not Found!");
});

module.exports = router;
