const { Schema, model } = require("mongoose");


const OpinionSchema = Schema({
    id: {
        type: String,
        require: true
    },
    comments: [{
    product: {
        type: Number,
        require: true
    },
    score: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    dateTime: {
        type: String,
        
    }
}]
})

module.exports = model("Opinion", OpinionSchema, "opiniones");