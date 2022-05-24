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
                numeClasa: String
            }
        ],
        scoala: ObjectId,
        materie: String
    })
);
module.exports = Users;
