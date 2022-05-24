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
                idClasa: ObjectId
            }
        ],
        scoala: ObjectId,
        materii: [
            {
                idMaterie: ObjectId
            }
        ]
    })
);
module.exports = Users;
