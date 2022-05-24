const CSVToJSON = require("csvtojson");
const Scoala = require("../models/scoala.model");
const User = require("../models/users.model");
const Materii = require("../models/materii.model");
const fsExtra = require("fs-extra");
const Clasa = require("../models/clasa.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Catalog = require("../models/catalog.model");
exports.uploadToDb = (req, res) => {
  console.log(req.body.collection);
  CSVToJSON()
    .fromFile(__basedir + "/csv/" + req.body.filename)
    .then((users) => {
      if (req.body.collection === "school") {
        let check = checkSchool(users[0]);
        if (check === true) {
          users.forEach((element) => {
            console.log(element);
            const scoala = new Scoala({
              nume: element.nume_scoala,
              oras: element.oras_scoala,
              adresa: element.adresa_scoala,
              telefon: element.telefon,
            });
            scoala.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              console.log("added");
            });
          });
        }
      } else if (req.body.collection === "users") {
        let check = checkElev(users[0]);
        if (check === true) {
          console.log("a trecut");
          users.forEach((element) => {
            const user = new User({
              email: element.email,
              nume: element.nume,
              prenume: element.prenume,
              password: bcrypt.hashSync(element.parola_default, 8),
              isAdmin: 1,
            });
            user.save(async function (err, obj) {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              console.log("added");
              let objid = obj.id;
              const doc = await Clasa.findOneAndUpdate(
                { nume: element.clasa },
                { $push: { elevi: { _idElev: objid } } },
                { upsert: true, new: true }
              );
              console.log(doc);
            });
          });
        }
      }
      fsExtra.emptyDirSync(__basedir + "/csv/");
    })
    .catch((err) => {
      console.log(err);
    });
};

function checkSchool(v) {
  //Header CSV - nume_scoala, oras_scoala, adresa_scoala, telefon
  let checkers = ["nume_scoala", "oras_scoala", "adresa_scoala", "telefon"];
  let array = Object.keys(v);
  array.forEach((element) => {
    if (!checkers.includes(element)) {
      return false;
    }
  });
  return true;
}

function checkElev(v) {
  //Header CSV - clasa, nume, prenume, email, parola_default
  let checkers = ["clasa", "nume", "prenume", "email", "parola_default"];
  let array = Object.keys(v);
  array.forEach((element) => {
    if (!checkers.includes(element)) {
      return false;
    }
  });
  return true;
}

exports.getAllSchools = async (req, res) => {
  const all = await Scoala.find({}).select({ nume: 1, _id: 0 });
  res.send(all);
};

exports.getCatalogByEmail = async (req, res) => {
  const elevID = await User.findOne({ email: req.query.email }).select({
    _id: 1,
  });
  let result = await Catalog.findOne({ idElev: elevID }).select({
    _id: 0,
    catalog: 1,
  });
  // console.log(result);
  if (!result) {
    res.status(500).send({ message: "Catalogul nu a fost gasit!" });
  }
  var obj = []
  var i = 0;
  if(result.catalog === [])
    res.status(500).send({message: "no data found"})
  for (let element of result.catalog) {
    obj.push(element.toJSON());
    var nume = await Materii.findOne({_id : obj[i]["idMaterie"]}, {_id: 0, nume: 1});
    obj[i]["nume"] = nume.nume;
    i = i + 1;
  }

  res.status(201).send(obj);
};
