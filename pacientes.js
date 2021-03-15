const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", function (req, res) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("pacientes").find().toArray(function (err, data) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            res.send(data);
        }
    });
});

router.post("/nuevo", function (req, res) {
    let dbConnection = req.app.locals.db;
    let nuevoPaciente = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        tarjeta: parseInt(req.body.tarjeta),
        telefono: req.body.telefono
    }
    dbConnection.collection("pacientes").insertOne(nuevoPaciente, function (err, data) {
        if (err !== null) {
            console.log(err);
            res.send({ mensaje: `Ha habido un error ${err}` });
        } else {
            res.redirect("/pacientes.html");
        }
    });
})

router.get("/borrar/:tarjeta", function (req, res) {
    let dbConnection = req.app.locals.db;
    let borrarPaciente = parseInt(req.params.tarjeta);
    dbConnection.collection("pacientes").deleteOne({tarjeta: borrarPaciente}, function (err, data) {
        if (err !== null) {
            console.log(err);
            res.send({ mensaje: `Ha habido un error ${err}` });
        } else {
            res.redirect("/pacientes.html");
        }
    });
})

router.put("/modificar/datos", function(req, res) {
    let dbConnection = req.app.locals.db;
    let nuevosDatos = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono
    }
    dbConnection.collection("pacientes").updateOne({"tarjeta": parseInt(req.body.tarjeta)}, {$set: nuevosDatos}, function (err, data) {
        if (err !== null) {
            console.log(err);
            res.send({ mensaje: `Ha habido un error ${err}` });
        } 
    });
});

module.exports = router;
