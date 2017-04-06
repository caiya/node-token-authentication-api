// =================================================================
// get the packages we need ========================================
// =================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors'); //cors支持
var compression = require('compression'); //压缩
var helmet = require('helmet'); //安全插件

var domain = require("domain");

var config = require('./config'); // get our config file
var User = require('./app/models/user'); // get our mongoose model
var Routes = require('./routes'); // get our mongoose model
var CheckToken = require('./routes/checktoken'); // check token model


// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(helmet());

//启用cors
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'x-access-token']
}));

app.use(compression());

app.use(require('express-domain-middleware'));

//以api开头的路由添加token校验
app.use("/api", CheckToken);
Routes(app);

app.use(function errorHandler(err, req, res, next) {
    console.log('error on request %d %s %s: %j', process.domain.id, req.method, req.url, err);
    res.send(500, "Something bad happened. :(");
    if (err.domain) {
        //you should think about gracefully stopping & respawning your server 
        //since an unhandled error might put your application into an unknown state 
    }
});

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port, function() {
    console.log('My Api is running...');
});