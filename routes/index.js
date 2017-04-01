module.exports = function(app) {
    //用户模块
    app.use("/api/user", require("./user.js"));
}