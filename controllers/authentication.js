const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function (req, res, next){
    // user already has the email and password
    // we just need to give them a token
    res.send({token: tokenForUser(req.user)});
};

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({error: "You must provide email and password!"});
    }

    // if user exist
    User.findOne({email: email}, function (err, docs) {
        if(err){ return next(err); }
        // if exist return error
        if(docs){
            return res.status(422).send({err:'Email is in use'});
        }

        // if not, create user
        const user = new User({
            email:email,
            password: password
        });
        user.save(function (err) {
            if(err){ return next(err); }

            res.json({token: tokenForUser(user)});
        });

        // respond to request indicating the user was created

    })

};