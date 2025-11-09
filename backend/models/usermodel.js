const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type: String},
    email:{type: String, require: true},
    password:{type:String},
    cartItems:{type:Object, default: {}},
    myOrders:{type:Object, default: {}},
    wishlist:{type:Object, default: {}}
},{minimize:false})

const usermodel = mongoose.models.user || mongoose.model("user",userSchema);

module.exports = usermodel;