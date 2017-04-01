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

var config = require('./config'); // get our config file
var User = require('./app/models/user'); // get our mongoose model
var Routes = require('./routes'); // get our mongoose model
var Authorize = require('./routes/authorize'); // get token model
var CheckToken = require('./routes/checktoken'); // check token model
var Signup = require('./routes/signup'); // signup model

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('common'));

app.use(helmet());

//启用cors
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'x-access-token']
}));

app.use(compression());

//注册
app.use("/signup", Signup);
//获取token
app.use('/authorize', Authorize);
//受token保护的路由
app.use("/api", CheckToken);
Routes(app);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port, function() {
    console.log('My Api is running...');
});