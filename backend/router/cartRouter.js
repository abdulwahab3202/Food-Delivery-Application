const express = require('express')
const {addToCart, removeFromCart, getCartItems, deleteFromCart} = require('../controller/cartController')
const cartRouter = express.Router();

cartRouter.post("/add",addToCart);
cartRouter.post("/remove",removeFromCart);
cartRouter.post("/getcart",getCartItems);
cartRouter.post("/delete",deleteFromCart);

module.exports = cartRouter;