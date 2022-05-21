const mongoose = require("mongoose");
const Scoala = mongoose.model(
    "scoala",
    new mongoose.Schema({
        nume: String,
        oras: String,
        adresa: String,
        telefon: String
    }, {collection: "scoala"})
);
module.exports = Scoala;
