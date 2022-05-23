const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/helper/get-full-name", [authJwt.verifyToken], controller.getUserFullNameByEmail);
    app.get("/api/helper/change-password", [authJwt.verifyToken], controller.changePassword);

};
