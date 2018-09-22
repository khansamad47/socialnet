var mongoose = require('mongoose');

// SCHEMA
var userSchema = mongoose.Schema({
    username : { type: String, required: true, unique: true},
    password :  { type: String, required: true},
    createdAt : { type: Date, default: Date.now},
    displayName : { type: String},
    bio : String
});

// METHODS
userSchema.methods.name = function() {
    return this.displayName || this.username;
};

userSchema.methods.checkPassword = function(guess, done) {
    var err = undefined;
    if (this.password === guess) {
    }
    else {
        err = "Not Matched!";
    }
    done(err); 
};

module.exports = mongoose.model("User", userSchema);
