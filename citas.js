const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


router.get("/", function (req, res) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("citas").find().toArray(function (err, data) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            res.send(data);
        }
    });
});

router.post("/nueva", function (req, res) {
    let dbConnection = req.app.locals.db;
    let nuevaCita = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        especialidad: req.body.especialidad,
        tarjeta: req.body.tarjeta
    }
    dbConnection.collection("citas").insertOne(nuevaCita, function (err, data) {        
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {           
        }
    });
});

router.get("/borrar/:tarjeta", function (req, res) {
    let dbConnection = req.app.locals.db;
    let borrarCita = parseInt(req.params.tarjeta);
    dbConnection.collection("citas").deleteOne({tarjeta: borrarCita}, function (err, data) {
        if (err !== null) {
            console.log(err);
            res.send({ mensaje: `Ha habido un error ${err}` });
        } else {            
            res.redirect("/citas.html");
        }
    });
})

router.put("/modificar/datos", function(req, res) {
    let dbConnection = req.app.locals.db;
    let nuevosDatos = {
        fecha: req.body.fecha,
        hora: req.body.hora
    }
    dbConnection.collection("citas").updateOne({"tarjeta": parseInt(req.body.tarjeta)}, {$set: nuevosDatos}, function (err, data) {
        if (err !== null) {
            console.log(err);
            res.send({ mensaje: `Ha habido un error ${err}` });
        } 
    });
});

let infoCita = []; 

module.exports = router;