var express = require('express');
var apiRoutes = express.Router();

var User = require('../app/models/user'); // get our mongoose model

apiRoutes.get("/", function(req, res, next) {
    // create a sample user
    var nick = new User({
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });
    nick.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    });
});


module.exports = apiRoutes;