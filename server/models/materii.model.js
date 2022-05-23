const mongoose = require("mongoose");
const Materii = mongoose.model(
    "materii",
    new mongoose.Schema({
        nume: String
    }, {collection: "materii"})
);
module.exports = Materii;
