const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

require("dotenv").config({path: "./config.env"});

const app = express();
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

const driver = require("./db/dbcon");

app.listen(port, () => {
    driver.connectToServer(function (err) {
        if (err) console.log(err);
    });
    console.log(`Catalog Online - Proiect MDS - port: ${port}`);
})