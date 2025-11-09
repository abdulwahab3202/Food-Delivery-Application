import React, { useContext, useEffect } from 'react'
import './OrderPlaced.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const OrderPlaced = ({ setMenu }) => {
  const { clearCartItems, fetchMyOrders, user } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='order-placed'>
      <div className="order-placed-container">
        <p>Order Placed</p>
        <img src="https://ik.imagekit.io/abdulwahab/images/green_tick_image.png?updatedAt=1748610251401" alt="gree-tick-image" />
        <button onClick={async () => {
          try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/myorders`, { _id: user._id });
            if (response.data.success) {
              fetchMyOrders();
              clearCartItems();
              localStorage.removeItem("cartItems");
              navigate('/');
              setMenu("home");
            } else {
              console.log("Order update failed:", response.data.msg);
            }
          } catch (error) {
            console.log("Error in order processing:", error);
          }
        }}>
          Back To Home
        </button>



      </div>
    </div>
  )
}

export default OrderPlaced