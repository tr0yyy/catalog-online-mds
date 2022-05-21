const { authJwt } = require("../middlewares");
const csvController = require("../controllers/csv.controller");
const dbController = require("../controllers/db.controller");
const upload = require('../middlewares/upload')
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/helper/upload-csv-file", [upload.single("file")] , csvController.upload);
    app.post("/api/db/load-data", dbController.uploadToDb)
    app.get("/api/db/get-all-schools", dbController.getAllSchools)

};
