var express = require('express');
var apiRoutes = express.Router();

var User = require('../app/models/user'); // get our mongoose model

apiRoutes.get('/', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

apiRoutes.get('/check', function(req, res) {
    res.json(req.decoded);
});

module.exports = apiRoutes;