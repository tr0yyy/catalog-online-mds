const mongoose = require("mongoose");
const {Int32, ObjectId} = require("mongodb");
const Users = mongoose.model(
    "users",
    new mongoose.Schema({
        nume: String,
        prenume: String,
        email: String,
        password: String,
        isAdmin: Number,
        clase: [
            {
                idClasa: mongoose.schema.Types.ObjectId
            }
        ],
        scoala: mongoose.Schema.Types.ObjectId,
        materii: [
            {
                idMaterie: mongoose.Schema.Types.ObjectId
            }
        ]
    })
);
module.exports = Users;
