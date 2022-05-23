const mongoose = require("mongoose");
const {Int32, ObjectId} = require("mongodb");
const Catalog = mongoose.model(
    "catalog",
    new mongoose.Schema({
        idElev: ObjectId,
        catalog: [
            {
                idMaterie: ObjectId,
                note: [
                    {
                        data: Date,
                        nota: Number
                    }
                ]
            }
        ]
    }, {collection: "catalog"})
);
module.exports = Catalog;
