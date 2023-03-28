const { Schema, model } = require("mongoose");

const VehiculoSchema = Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },
    currency: {
        type: String,
        require: true
    },
    bodywork: {
        type: String,
        require: true
    }, 
    category: {
        type: String, 
        require: true
    }
});

module.exports = model("Auto", VehiculoSchema, "auto");
