const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const Clasa = mongoose.model(
    "clasa",
    new mongoose.Schema({
        nume: String,
        elevi: [
            {
                _idElev: mongoose.Schema.Types.ObjectId
            }
        ]
    }, {collection: "clasa"})
);
module.exports = Clasa;
