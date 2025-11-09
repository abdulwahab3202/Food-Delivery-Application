import React, { useContext } from 'react';
import './CheckoutPage.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
  const { user, food_list, cartItems, getTotalCartAmount, clearCartItems } = useContext(StoreContext);

  const makePayment = async (e) => {
    e.preventDefault();

    const form = document.querySelector(".check-out-left");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (getTotalCartAmount() === 0) {
      Swal.fire({
        title: "Unable to place order!",
        text: "Your cart is empty. Please add items.",
        icon: "error",
        scrollbarPadding: false
      });
      return;
    }

    const orderDetails = Object.keys(cartItems)
      .filter((itemId) => cartItems[itemId] > 0)
      .map((itemId) => {
        const item = food_list.find((food) => food._id == itemId);

        if (!item) {
          console.warn(`Item with ID ${itemId} not found in food_list`);
          return null;
        }

        return {
          name: item.name,
          price: item.price,
          quantity: cartItems[itemId],
          image: item.image,
        };
      })
      .filter((item) => item !== null);


    const payment = await axios.post("http://localhost:3000/payment", { items: orderDetails, userId: user._id });

    if (payment.data.success) {
      clearCartItems();
      window.location.replace(payment.data.sessionUrl);
    } else {
      Swal.fire({
        title: "Payment Failed!",
        text: payment.data.msg,
        icon: "error",
        scrollbarPadding: false
      });
    }
  };

  return (
    <>
      <div className="check-out">
        <form className="check-out-left">
          <p className="title">Delivery Information</p>
          <div className="flex-field">
            <div className="name">
              <p className='p'>First Name</p>
              <input type="text" required />
            </div>
            <div className="name">
              <p className='p'>Last Name</p>
              <input type="text" required />
            </div>
          </div>
          <p className='p'>E-mail</p>
          <input type="email" required />
          <p className='p'>Country</p>
          <input type="text" required />
          <div className="flex-field">
            <div>
              <p className='p'>State</p>
              <input type="text" required />
            </div>
            <div>
              <p className='p'>City</p>
              <input type="text" required />
            </div>
          </div>
          <p className='p'>Land Mark</p>
          <input type="text" required />
          <div className="flex-field">
            <div>
              <p className='p'>Phone</p>
              <input type="text" required />
            </div>
            <div>
              <p className='p'>Zip Code</p>
              <input type="text" required />
            </div>
          </div>
        </form>
        <div className="check-out-right">
          <p className='title'>Order Summary</p>
          <div className='check-out-right-container'>
            {getTotalCartAmount() === 0 ? <p>No items available in the cart!</p> : <></>}
            {
              food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div key={item._id}>
                      <div className="summary-container">
                        <p>{item.name}</p>
                        <p>₹{cartItems[item._id] * item.price}</p>
                      </div>
                      <hr className='horizontal-line' />
                    </div>
                  );
                }
              })
            }
          </div>
        </div>
        <div className="check-out-bottom">
          <div className="check-out-total">
            <p className="title">Cart Totals</p>
            <div className='check-out-total-container'>
              <div className="check-out-total-details">
                <p>Food Total</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr className="horizontal-line" />
              <div className="check-out-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
              </div>
              <hr className="horizontal-line" />
              <div className="check-out-total-details">
                <b><p>Total</p></b>
                <b><p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</p></b>
              </div>
            </div>
            <button className='check-out-button' onClick={makePayment}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
