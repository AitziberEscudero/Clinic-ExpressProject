const express = require("express");
const app = express();
const mongodb = require("mongodb");

let pacientes = require("./pacientes")
let medicos = require("./medicos")
let citas = require("./citas")

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/pacientes", pacientes);
app.use("/medicos", medicos);
app.use("/citas", citas);

let MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err !== null) {
        console.log(err);
    } else {
        app.locals.db = client.db("proyectoDos");
    }
});

app.listen(3000);