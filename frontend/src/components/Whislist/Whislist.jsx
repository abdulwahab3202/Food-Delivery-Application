import React, { useContext, useEffect } from 'react';
import './Wishlist.css';
import { StoreContext } from '../../context/StoreContext';

const Wishlist = () => {
    const { wishlist, food_list, getWishlist, user } = useContext(StoreContext);

    useEffect(() => {
        if (user?._id) {
            getWishlist();
        }
    }, [user]);

    const wishlistItems = Object.keys(wishlist || {}).filter(id => id !== "undefined");

    return (
        <div className="wishlist">
            <h1>Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p className="empty-message">Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-page">
                    {Object.keys(wishlist || {})
                        .filter((itemId) => wishlist[itemId])
                        .map((itemId, index) => {
                            const item = food_list.find((food) => String(food._id) === String(itemId));
                            if (!item) return null;
                            return (
                                <div className="wishlist-container" key={index}>
                                    <div className="wishlist-image-container">
                                        <img src={item.image} alt="food image" />
                                    </div>
                                    <div className="wishlist-desc">
                                        <h3>{item.name}</h3>
                                    </div>
                                </div>
                            );
                        })}

                </div>
            )}
        </div>
    );
};

export default Wishlist;
