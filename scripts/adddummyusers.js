var mongoose = require('mongoose');
var User     = require('../models/user');

mongoose.connect('mongodb://localhost:27017/socialnet',
    {useNewUrlParser: true}
).then(function(out){
    console.log("Connected to database.");
});

var user1 = new User({
    username : "akhan",
    displayName : "Samad Khan",
    password : 'qwerty',
    bio : 'Hi my name is Samad'
    
});
user1.save();

var user2 = new User({
    username : "mwahaj",
    displayName : "Wahaj Khan",
    password : '12345',
    bio : 'This is wahaj khan!'
    
});
user2.save();
