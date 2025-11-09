import React, { useContext, useEffect } from 'react';
import './FoodItem.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { StoreContext } from '../../context/StoreContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const FoodItem = ({ id, name, price, description, image }) => {
    const { user, cartItems, addToCart, removeFromCart, wishlist, getWishlist } = useContext(StoreContext);

    const inWishlist = wishlist && wishlist[id];

    useEffect(() =>{
        getWishlist();
    },[user]);

    const toggleWishlist = async () => {
        if (!user) {
            Swal.fire({
                title: "Unable to modify the wishlist!",
                text: "Please log in and continue!",
                icon: "error",
                scrollbarPadding: false
            });
            return;
        }
        await axios.post(`${import.meta.env.VITE_BASE_URL}/user/wishlist`, { _id: user._id, itemId: id });
        await getWishlist();
    };
    
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                {inWishlist ? (
                    <FaHeart size={24} color="red" onClick={toggleWishlist} className='wishlist-icon' />
                ) : (
                    <FaRegHeart size={26} color="gray" onClick={toggleWishlist} className='wishlist-icon' />
                )}

                <img className='food-item-image' src={image} alt="food image" />
                <div className="food-item-name-description">
                    <p className='food-item-name'>{name}</p>
                    <p className="food-item-desc">{description}</p>
                </div>
            </div>
            <div className="food-item-info">
                <p className="food-item-price">₹{price}</p>
                {
                    !cartItems[id]
                        ? (
                            <img className='add' onClick={() => {
                                if(!user){
                                    Swal.fire({
                                        title: "Unable to add the item!",
                                        text: "Please log in and continue!",
                                        icon: "error",
                                        scrollbarPadding: false
                                    });
                                }
                                else{
                                    addToCart(id);
                                }
                            }} src="https://ik.imagekit.io/abdulwahab/images/add_icon_white.png?updatedAt=1748610051817" alt="add-icon-white" />
                        ) : (
                            <div className="food-item-counter">
                                <img className='red' onClick={() => removeFromCart(id)} src="https://ik.imagekit.io/abdulwahab/images/remove_icon_red.png?updatedAt=1748610176608" alt="remove-icon-red" />
                                <p>{cartItems[id]}</p>
                                <img className='green' onClick={() => addToCart(id)} src="https://ik.imagekit.io/abdulwahab/images/add_icon_green.png?updatedAt=1748610161724" alt="add-icon-green" />
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default FoodItem;
