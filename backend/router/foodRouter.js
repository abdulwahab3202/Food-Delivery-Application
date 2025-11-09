const express = require('express');
const foodRouter = express.Router();
const { listfood, listmenu, addFood, deleteFood, editFood } = require('../controller/foodController');

foodRouter.get("/list", listfood);
foodRouter.get("/menu", listmenu);
foodRouter.post("/add",addFood);
foodRouter.post("/edit",editFood);
foodRouter.post("/delete",deleteFood);

module.exports = foodRouter;