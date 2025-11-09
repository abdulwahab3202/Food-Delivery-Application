const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name:{type:String, require:true},
    price:{type:Number, require:true},
    description:{type:String, require:true},
    category:{type:String, require:true},
    image:{type:String, require:true}
})

const foodmodel = mongoose.models.food || mongoose.model("food",foodSchema);

module.exports = foodmodel;