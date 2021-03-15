const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", function(req, res) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("medicos").find().toArray(function(err, data) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            res.send(data);
        }
    });
});

module.exports = router;

