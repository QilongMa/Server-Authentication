const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: { type:String, unique:true, lowercase: true},
    password: String
});

// On save hook, encrypt password
userSchema.pre('save', function (next) {
    // get access to the user model
   const user = this;

   // generate a salt
   bcrypt.genSalt(10, function (err, salt) {
       if(err){ return next(err); }

       // hash password using the salt
       bcrypt.hash(user.password, salt, null, function (err, hash) {
           if(err) { return next(err); }

           user.password = hash;
           next();
       })
   })
});

// when a object created, it will have this methods object and compare function
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if(err) {return callback(err); }

        callback(null, isMatch);
    })
};

// Create the model class
const User = mongoose.model('user', userSchema);


// Export the model
module.exports = User;