const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

global.__basedir = __dirname;

require("dotenv").config({path: "./config.env"});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const db = require("./models")

db.mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.listen(port, () => {
    console.log(`Catalog Online - Proiect MDS - port: ${port}`);
});

//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/db.routes')(app)
