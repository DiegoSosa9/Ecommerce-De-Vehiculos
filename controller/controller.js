const opinion = require ("../models/opinion");
const vehiculo = require ("../models/vehiculo");
const validator = require("validator");

//Obtenemos todos los vehiculos
const getVehiculos = async (req,res) => {
    const consulta = await vehiculo.find();
        res.json(consulta);
    }


//Obtenemos los comentarios de cada vehiculo
const getOpinion = async (req,res) => {
    let id = req.params.id;
    const consulta = await opinion.find({ "id": id});
    res.json(consulta);
}


//Obtenemos un vehiculo en particular
const getVehiculo = async (req,res) => {
    let id = req.params.id;
    const consulta = await vehiculo.find({ "id": id});
    res.json(consulta);
}


//Publicamos un nuevo vehiculo
const postVehiculo = async (req,res) => {
    let params = req.body;
    console.log(params);
    //Validación de datos
    try {
        let validar_cadena = !validator.isEmpty(params.id) && !validator.isEmpty(params.name) && !validator.isEmpty(params.description) && 
        !validator.isEmpty(params.cost) && !validator.isEmpty(params.currency) && !validator.isEmpty(params.bodywork) &&
        !validator.isEmpty(params.category);

        if(!validar_cadena){
            throw new Error ("No se pudo validar la información");
        }

    } catch (error) {
        return res.status(400).json({
            status: "Error"
        });
    }

    //Creación de objeto a guardar 
    const newVehiculo = new vehiculo(params);
    
    //Guardarlo en la BDD
    newVehiculo.save().then((vehiculo) => {
        return res.status(200).json({
            status: "Success",
            vehiculo: vehiculo,
            mensaje: "Vehiculo guardado con exito"
        });
    }, (error) => {
        console.log(String(error));
        res.status(400).json({
            mensaje: "No se pudo guardar vehiculo",
            status: "Error"
        });
    })

    

}


const updateComment = async (req,res) => {
    let bod = req.body;
    let comentario = {"product" : bod.id, "score" : bod.score, "description" : bod.description, "user" : bod.user, "dateTime" : bod.dateTime};
    console.log(comentario);
    res.send(bod);

    // const comm = await opinion.find({"id": bod.id});
    const comm = await opinion.updateOne({id: bod.id}, {$push: {comments: [comentario] }});

    console.log(comm);
}

const postComment = async (req,res) => {
    let bod = req.body;
    let comentario = {"product" : bod.id, "score" : bod.score, "description" : bod.description, "user" : bod.user, "dateTime" : bod.dateTime};

    //Validación de datos
    try {
        let validar_cadena = !validator.isEmpty(bod.id) && !validator.isEmpty(bod.score) && !validator.isEmpty(bod.description) && 
        !validator.isEmpty(bod.user) && !validator.isEmpty(bod.dateTime);

        if(!validar_cadena){
            throw new Error ("No se pudo validar la información");
        }

    } catch (error) {
        return res.status(400).json({
            status: "Error"
        });
    }

    //Creación de objeto a guardar 
    const newComment = new opinion({
        id: bod.id,
        comments: [comentario]
    });
    
    //Guardarlo en la BDD
    newComment.save().then((opinion) => {
        return res.status(200).json({
            status: "Success",
            opinion: opinion,
            mensaje: "Comentario guardado con exito"
        });
    }, (error) => {
        console.log(String(error));
        res.status(400).json({
            mensaje: "No se pudo guardar vehiculo",
            status: "Error"
        });
    })

}

module.exports = {
    getVehiculos,
    getOpinion,
    getVehiculo,
    postVehiculo,
    updateComment,
    postComment
}