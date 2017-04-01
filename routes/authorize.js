var express = require('express');
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var User = require('../app/models/user'); // get our mongoose model
var config = require('../config'); // get our config file

//获取token
apiRoutes.post("/authorize", function(req, res, next) {
    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});



module.exports = apiRoutes;