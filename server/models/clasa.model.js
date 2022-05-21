const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const Clasa = mongoose.model(
    "clasa",
    new mongoose.Schema({
        nume: String,
        elevi: [
            {
                idElev: Number
            }
        ]
    }, {collection: "clasa"})
);
module.exports = Clasa;
