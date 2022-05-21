const fs = require("fs");
const csv = require("fast-csv");
exports.upload = (req, res) => {
    try {
        if (req.file === undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }
        return res.status(201).send({
            message: req.file
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};