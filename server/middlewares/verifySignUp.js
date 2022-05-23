/// used in early stage to register admin accounts

const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;
checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    console.log(req.body.email);
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
        next();
    });
};
checkRolesExisted = (req, res, next) => {
    if (req.body.isAdmin) {
        if (!ROLES.includes(req.body.isAdmin)) {
            res.status(400).send({
                message: `Failed! Role ${req.body.isAdmin} does not exist!`
            });
            return;
        }
    }
    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};
module.exports = verifySignUp;
