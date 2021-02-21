const mongoose = require ("mongoose")
const mensSchema=mongoose.Schema({
    ranking:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Number,
        required:true,
        unique:true
    },
    country:{
        type:String,
        required:true,
        unique:true
    },
    score:{
        type:Number,
        required:true,
        unique:true
    },
    event:{
        type:String,
        default:"100m"
    }
    
})

const MensRanking= mongoose.model("MenRanking",mensSchema)

module.exports = MensRanking;