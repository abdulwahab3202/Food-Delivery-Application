const express = require('express')
const foodmodel = require('../models/foodmodel');
const menumodel = require('../models/menumodel');

const listfood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json(foods)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const listmenu = async (req, res) => {
    try {
        const menu = await menumodel.find({});
        res.json(menu);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const addFood = async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body;

        const newFood = await foodmodel.insertMany({ name, price, description, category, image });

        res.json({ success: true, message: "Item Added Successfully", food: newFood });
    } catch (err) {
        console.error(err);
        res.send({ success: false, message: "Internal Server Error" });
    }
};

const editFood = async (req, res) => {
    try {
        const { itemId, name, price, description, category, image } = req.body;

        const food = await foodmodel.findByIdAndUpdate(itemId,{ name, price, description, category, image },{ new: true });

        if (!food) {
            return res.status(404).json({ success: false, msg: "Food item not found" });
        }

        res.json({ success: true, msg: "Item edited successfully", food });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Unable to edit the food" });
    }
};


const deleteFood = async (req, res) => {
    try {
        const { itemId } = req.body;
        const food = await foodmodel.findByIdAndDelete(itemId);
        res.json({success: true, msg: "Food deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.json({success: false, msg: "Unable to delete the food"});
    }
}

module.exports = { listfood, listmenu, addFood, deleteFood,editFood };