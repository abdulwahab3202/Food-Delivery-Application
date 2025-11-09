const usermodel = require('../models/usermodel');
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailExist = await usermodel.findOne({ email });
        if (emailExist) {
            return res.send({ success: false, msg: "Email already exists" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = await usermodel.create({ name, email, password: hashedPassword });
        return res.send({ success: true, msg: "Account created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await usermodel.findOne({ email });
        if (!result) {
            return res.send({ success: false, msg: "User does not exist" });
        }
        const isPasswordMatch = await bcrypt.compare(password, result.password);
        if (!isPasswordMatch) {
            return res.send({ success: false, msg: "Incorrect Password" });
        }
        return res.send({ success: true, msg: "Logged in Successfully", user: result });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
};

const googlelogin=async(req,res)=>{
    const {name,email}=req.body;
    try{
        const user=await usermodel.findOne({email});
        if(user){
           return res.json({success:true,user:user});
        }
        const newuser=await usermodel.insertMany({name,email});
        res.json({success:true,user:newuser[0]});
    }
    catch(err){
        console.log(err);
    }
};

const myorders = async (req, res) => {
    const { _id } = req.body;
    try {
        const user = await usermodel.findById(_id);

        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        const cartItems = user.cartItems || {};
        const myOrders = Array.isArray(user.myOrders) ? user.myOrders : [];
        for (const itemId in cartItems) {
            if(cartItems[itemId] > 0){
                myOrders.push({ itemId, quantity: cartItems[itemId] });
            }
        }

        const updatedUser = await usermodel.findByIdAndUpdate(
            _id,
            { myOrders, cartItems: {} },
            { new: true }
        );

        res.json({ success: true, msg: "Items added to my orders", user: updatedUser });
    } catch (err) {
        console.log(err);
        res.json({ success: false, msg: "Failed to add the items to my orders" });
    }
};

const fetchmyorders = async (req, res) => {
    const { _id } = req.body;
    try {
        const user = await usermodel.findById(_id);
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }
        res.json({ success: true, user: user });

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, msg: "Failed to fetch items in my orders" });
    }
}

const wishlist = async (req, res) => {
    try {
        const { _id, itemId } = req.body;

        const user = await usermodel.findById(_id);
        if (!user) {
            return res.send({ success: false, msg: "User does not exist" });
        }

        if (!user.wishlist) {
            user.wishlist = {};
        }

        user.wishlist[itemId] = !user.wishlist[itemId];

        await usermodel.findByIdAndUpdate(_id, { wishlist: user.wishlist });

        return res.send({ success: true, wishlist: user.wishlist });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ success: false, msg: "Error occurred in wishlist" });
    }
};




module.exports = { signup, login, googlelogin, myorders, fetchmyorders, wishlist };