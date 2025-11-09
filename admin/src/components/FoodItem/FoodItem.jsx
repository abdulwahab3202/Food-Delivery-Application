import React, { useContext, useEffect, useState } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
const FoodItem = ({ id, name, price, description, image }) => {
    const { food_list, setFoodlist, fetchFood, selectedFood, setSelectedFood } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFood();
    }, [])

    const editFood = async () => {
        try {
            const food = { id, name, price, description, image };
            setSelectedFood(food);
            navigate('/edit');
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteFood = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this food item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            scrollbarPadding: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/food/delete`, { itemId: id });
                    if (response.data.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: response.data.msg,
                            icon: "success",
                            scrollbarPadding: false
                        });
                        setFoodlist(food_list.filter(food => food._id !== id));
                    } else {
                        Swal.fire({
                            title: "Oops!",
                            text: "Unable to delete the food item.",
                            icon: "error",
                            scrollbarPadding: false
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });
    };
    
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image} alt="food image" />
                <div className="food-item-name-description">
                    <p className='food-item-name'>{name}</p>
                    <p className="food-item-desc">{description}</p>
                </div>
            </div>
            <div className="food-item-info">
                <p className="food-item-price">₹{price}</p>
                <img onClick={() => { editFood() }} className='edit-icon' src="https://cdn-icons-png.freepik.com/256/5171/5171801.png?uid=R147455405&ga=GA1.1.1409561897.1729397420&semt=ais_hybrid" alt="edit icon" />
                <img onClick={() => { deleteFood() }} className='delete-icon-image' src="https://cdn-icons-png.freepik.com/256/4654/4654889.png?uid=R147455405&ga=GA1.1.1409561897.1729397420&semt=ais_hybrid" alt="delete-icon" />
                {/* {
                    !cartItems[id]
                    ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add-icon-white" />
                    : <div className="food-item-counter">
                        <img className='red' onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="add-icon-green" />
                        <p>{cartItems[id]}</p>
                        <img className='green' onClick={() => addToCart(id)} src={assets.add_icon_green} alt="remove-icon-red" />
                    </div>
                } */}
            </div>
        </div>
    )
}

export default FoodItem