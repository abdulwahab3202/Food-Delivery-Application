const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    menu_name:{type:String, require:true},
    menu_image:{type:String, require:true}
})

const menumodel = mongoose.models.menu || mongoose.model("menu",menuSchema)

module.exports = menumodel;