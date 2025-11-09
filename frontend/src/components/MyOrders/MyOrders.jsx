import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { user, myorders, food_list } = useContext(StoreContext);

  const userOrders = myorders.length > 0 ? myorders : user?.myOrders || [];

  const foodMap = food_list.reduce((acc, food) => {
    acc[food._id] = food;
    return acc;
  }, {});

  return (
    <div className="my-orders">
      <h1 className="h1">My Orders</h1>
      {userOrders.length > 0 ? (
        <div className="my-orders-page">
          {userOrders.map((order, index) => {
            const item = foodMap[order.itemId];
            if (!item) return null;

            return (
              <div className="my-orders-container" key={index}>
                <div className="my-orders-img-container">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="my-orders-desc">
                  <h3>{item.name}</h3>
                  <p>Qty: {order.quantity}</p>
                  <h4>₹{item.price * order.quantity}</h4>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="empty-message">You have not ordered any items yet!</p>
      )}
    </div>
  );
};

export default MyOrders;
