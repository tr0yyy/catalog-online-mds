const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.users = require('./users.model');
db.clasa = require('./clasa.model');
db.catalog = require('./catalog.model');
db.materii = require('./materii.model');
db.scoala = require('./scoala.model');

let elev = 1 // asa sunt definite in baza de date rolurile
let profesor = 2
let admin = 3

db.ROLES = [elev, profesor, admin];

module.exports = db;