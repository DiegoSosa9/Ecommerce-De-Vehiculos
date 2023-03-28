const mongoose = require("mongoose");

const connection = async() =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/vehiculos");
        console.log("Conectado a la base de datos Vehiculos");
    } catch (error) {
        console.log(error);
        throw new Error("No es posible conectarse a la base de datos");
    }
};

module.exports = {
    connection
}