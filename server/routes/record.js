const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/dbcon");
const objectId = require("mongodb").ObjectId;

module.exports = recordRoutes;