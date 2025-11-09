const usermodel = require('../models/usermodel');

const addToCart = async (req, res) => {
    try {
        const { _id, itemId } = req.body;
        const user = await usermodel.findOne({ _id });

        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        if (!user.cartItems) {
            user.cartItems = {};
        }

        if (!user.cartItems[itemId]) {
            user.cartItems[itemId] = 1;
        } else {
            user.cartItems[itemId] += 1;
        }

        await usermodel.findByIdAndUpdate(_id, { cartItems: user.cartItems });
        res.json({ success: true, msg: "Item added successfully", cartItems: user.cartItems });

    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: "Unable to add the item" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { _id, itemId } = req.body;
        const user = await usermodel.findOne({ _id });

        if (!user) {
            return res.json({ success: false, msg: "User does not exist" });
        }

        if (user.cartItems && user.cartItems[itemId] > 0) {
            user.cartItems[itemId] -= 1;
        }

        await usermodel.findByIdAndUpdate(_id, { cartItems: user.cartItems });
        res.json({ success: true, msg: "Item removed successfully", cartItems: user.cartItems });

    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: "Unable to remove the item" });
    }
};

const deleteFromCart = async (req, res) => {
    try {
        const { _id, itemId } = req.body;
        const user = await usermodel.findOne({ _id });

        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        if (user.cartItems && user.cartItems[itemId] !== undefined) {
            user.cartItems[itemId] = 0;
        }

        await usermodel.findByIdAndUpdate(_id, { cartItems: user.cartItems });
        res.json({ success: true, msg: "Item removed successfully", cartItems: user.cartItems });

    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: "Unable to remove the item" });
    }
};

const getCartItems = async (req, res) => {
    const { _id } = req.body;
    try {
        const user = await usermodel.findOne({ _id });

        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        const cart = user.cartItems || {};
        res.json({ success: true, cartItems: cart });

    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: "Unable to fetch cart items" });
    }
};

module.exports = { addToCart, removeFromCart, getCartItems, deleteFromCart };