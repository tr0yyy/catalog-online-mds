const CSVToJSON = require('csvtojson');
const Scoala = require("../models/scoala.model");
const User = require("../models/users.model");
const Materii = require("../models/materii.model");
const fsExtra = require('fs-extra')
const Clasa = require('../models/clasa.model')
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Catalog = require("../models/catalog.model");
exports.uploadToDb = (req, res) => {
    console.log(req.body.collection)
    CSVToJSON().fromFile(__basedir + '/csv/' + req.body.filename)
        .then(async users => {
            if (req.body.collection === 'school') {
                let check = checkSchool(users[0])
                if (check === true) {
                    users.forEach(element => {
                        console.log(element)
                        const scoala = new Scoala({
                            nume: element.nume_scoala,
                            oras: element.oras_scoala,
                            adresa: element.adresa_scoala,
                            telefon: element.telefon
                        });
                        scoala.save(err => {
                            if (err) {
                                res.status(500).send({message: err});
                                return;
                            }
                            console.log("added")
                        });

                    })
                }
            } else if (req.body.collection === 'users') {
                let check = checkElev(users[0])
                if (check === true) {
                    console.log("a trecut")
                    let school = await Scoala.findOne({"nume": req.body.school.nume}, {_id: 1})
                    users.forEach(element => {
                        const user = new User({
                            email: element.email,
                            nume: element.nume,
                            prenume: element.prenume,
                            password: bcrypt.hashSync(element.parola_default, 8),
                            isAdmin: 1,
                            scoala: school._id
                        });
                        user.save(async function (err, obj) {
                            if (err) {
                                console.log(err)
                                res.status(500).send({message: err});
                                return;
                            }
                            console.log("added")
                            let objid = obj._id
                            const doc = await Clasa.findOneAndUpdate({"nume": element.clasa}, {$push: {elevi: {"_idElev": objid}}, $set: {'scoala': school._id}}, {
                                upsert: true,
                                new: true
                            })
                        });

                    })
                }
            }else if(req.body.collection === "materii"){
                let check = checkMaterii(users[0]);
                console.log(check);
                if(check === true){
                  users.forEach((element) => {
                    console
                    const materie = new Materii( {
                      nume: element.nume
                    });
                    console.log(materie);
                  materie.save((err) => {
                    if(err)
                    res.status(500).send({message:err});
                    return;
                  });
                  });
                }
              }
              fsExtra.emptyDirSync(__basedir + "/csv/");
              res.status(201).send({ message: "success" });
            })
            .catch((err) => {
              console.log(err);
            });
        };

        function checkMaterii (v) {
          //Header CSV - nume
          let checkers = ['nume'];
          let array = Object.keys(v);
          array.forEach(element => {
              if(!checkers.includes(element)) {
                  return false
              }
          });
          return true;
        }
function checkSchool (v) {
    //Header CSV - nume_scoala, oras_scoala, adresa_scoala, telefon
    let checkers = ['nume_scoala', 'oras_scoala', 'adresa_scoala', 'telefon'];
    let array = Object.keys(v);
    array.forEach(element => {
        if(!checkers.includes(element)) {
            return false
        }
    });
    return true;
}

function checkElev (v) {
    //Header CSV - clasa, nume, prenume, email, parola_default
    let checkers = ['clasa', 'nume', 'prenume', 'email', 'parola_default'];
    let array = Object.keys(v);
    array.forEach(element => {
        if(!checkers.includes(element)) {
            return false
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
    console.log(req.query.email + "_" + elevID)
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
    if(result.catalog === []) {
        res.status(500).send({message: "no data found"})
    }
    for (let element of result.catalog) {
        obj.push(element.toJSON());
        var nume = await Materii.findOne({_id : obj[i]["idMaterie"]}, {_id: 0, nume: 1});
        obj[i]["nume"] = nume.nume;
        i = i + 1;
    }

    res.status(201).send(obj);
};

exports.getAllStudentsFromProfessor = async(req, res) => {
    let user = await User.findOne({email: req.query.email})
    if(user.clase) {
        res.status(201).send(user.clase);
        return
    } else {
        res.status(500).send({message: "No classes found"});
        return
    }
}

increment = async(number) => {
    return number + 1
}

exports.getStudentsFromClass = async(req, res) => {
    let elevi = await Clasa.findOne( {nume: req.query.numeClasa}).select({_id: 0, elevi: 1});

    if (!elevi) {
        res.status(500).send({ message: "Elevii nu au fost gasiti!", data: [] });
        return
    } else {
        let obj = []
        var i = -1;
        if(elevi.elevi === []) {
            res.status(500).send({message: "no data found"});
            return
        } else {
            for await (let element of elevi.elevi) {
                i = await increment(i)
                obj.push(element.toJSON());
                let dateElev = await User.findOne({_id: obj[i]._idElev}).select({nume: 1, prenume: 1});
                console.log(dateElev);
                obj[i]['nume'] = dateElev.nume
                obj[i]['prenume']= dateElev.prenume

                let materia = await Materii.findOne( {nume: req.query.numeMaterie}).select({_id: 1});
                let result = await Catalog.findOne({ idElev: obj[i]._idElev }).select({
                    _id: 0,
                    catalog: 1,
                });
                obj[i]['catalog'] = []
                if(result) {
                    console.log(result.catalog[0].idMaterie)
                    for(let j = 0 ; j < result.catalog.length ; j++) {
                        if (result.catalog[j].idMaterie.toString() === materia._id.toString()) {
                            console.log(i)
                            obj[i]['catalog'] = result.catalog[j]
                            console.log(obj[i]);
                            break
                        }
                    }
                }
                console.log(i)


            }
            res.status(201).send(obj);
            return
        }
    }
}

exports.setGrade = async (req,res) => {
    console.log(req.body)
    let elev = await User.findOne({nume: req.body.nume, prenume: req.body.prenume}, {_id: 1})
    let materieId = await Materii.findOne( {nume: req.body.numeMaterie }, {_id: 1});

    let catalogDoc = await Catalog.findOneAndDelete({idElev: elev._id});
    if(catalogDoc === null) {
        catalog = new Catalog({
            idElev: elev._id,
            catalog: [
                {
                    idMaterie: materieId._id,
                    note: [
                        {
                            data: new Date(),
                            nota: req.body.nota
                        }
                    ]
                }
            ]
        })
    } else {
        console.log("nu exista")
        catalog = new Catalog({
            idElev: elev._id,
            catalog: catalogDoc.catalog
        })
        let OK = false
        console.log("BEFORE FOR")
        console.log(catalog.catalog)
        for (let i = 0 ; i < catalog.catalog.length ; i++) {
            console.log("IN FOR")
            if(catalog.catalog[i].idMaterie.toString() === materieId._id.toString()) {
                console.log("IN IF")
                catalog.catalog[i].note.push({
                    data: new Date(),
                    nota: req.body.nota
                })
                OK = true
                break
            }
        }
        if(OK === false) {
            catalog.catalog.push(
                {
                    idMaterie: materieId._id,
                    note: [
                        {
                            data: new Date(),
                            nota: req.body.nota
                        }
                    ]
                }
            )
        }
    }

    catalog.save(function (err, obj) {
        if (err) {
            console.log(err)
            res.status(500).send({message: err});
            return;
        }
        console.log("added")
        res.status(201).send(obj);
    })


}

exports.getMaterie = async (req,res) => {
    console.log(req.query.email)
    let elev = await User.findOne({email: req.query.email}, {materie: 1, _id: 0})
    console.log(elev)
    res.status(201).send(elev);
}