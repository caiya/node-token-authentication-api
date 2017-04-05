module.exports = function(app) {
    //用户模块
    app.use("/api/user", require("./user.js"));
    //注册
    app.use("/signup", require('./signup'));
    //获取token
    app.use('/authorize', require('./authorize'));
}