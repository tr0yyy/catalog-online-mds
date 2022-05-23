const db = require("../models");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const User = db.users;

exports.getUserFullNameByEmail = (req, res) => {
    console.log(req.body.email)
    User.findOne({
        email: req.body.email
    }).exec((e, user) => {
        if(e) {
            res.status(500).send({ message: e });
        } else if (user) {
            res.json({
                nume: user.nume,
                prenume: user.prenume
            })
        } else {
            res.json({message: "user not found"})
        }
    })
}
exports.changePassword = (req, res) => {
    console.log(req.query)
    assert.ok(req.query.email)
    assert.ok(req.query.oldPassword)
    assert.ok(req.query.newPassword)
    User.findOne({
        email: req.query.email
    })
        .exec((err, user) => {
            var passwordIsValid = bcrypt.compareSync(
                req.query.oldPassword,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            } else {
                user.password = bcrypt.hashSync(req.query.newPassword, 8)
                user.save(err => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    return res.status(201).send({message: "Password changed successfully!"});
                })
            }
        })
}