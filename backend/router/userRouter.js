const express = require('express');
const userRouter = express.Router();
const {signup,login,googlelogin, myorders,fetchmyorders,wishlist} = require('../controller/userController');

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/googlelogin",googlelogin);
userRouter.post("/myorders",myorders);
userRouter.post("/fetchmyorders",fetchmyorders);
userRouter.post("/wishlist",wishlist)


module.exports = userRouter;