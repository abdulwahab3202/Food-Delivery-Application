const mongoose = require('mongoose');

const connectdbs = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Database connection failed");
    }
}
module.exports = connectdbs;