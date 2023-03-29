const express = require("express");
const router = express.Router();
const Controller = require("../controller/controller");

router.get("/vehiculos", Controller.getVehiculos);
router.get("/opiniones/:id", Controller.getOpinion);
router.get("/vehiculos/:id", Controller.getVehiculo);
router.post("/vehiculos", Controller.postVehiculo, Controller.upload.single('File'), (req,res) => {
    res.send("Se cargo con exito " + req.file.filename);
} );
router.put("/opiniones/:id", Controller.updateComment);
router.post("/opiniones", Controller.postComment);
router.post("/cargarimagen",Controller.upload.single('File'), (req,res) => {
    res.send("Se cargo con exito " + req.file.filename);
});

module.exports = router;