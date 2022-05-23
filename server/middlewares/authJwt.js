const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};
checkAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(user.isAdmin === 3) {
            next();
        } else {
            res.status(403).send({ message: "Require Admin Role!" });
        }
    });
};
checkProfesor = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(user.isAdmin === 2) {
            next();
        } else {
            res.status(403).send({ message: "Require Professor Role!" });
        }
    });
};
const authJwt = {
    verifyToken,
    checkAdmin,
    checkProfesor
};
module.exports = authJwt;
