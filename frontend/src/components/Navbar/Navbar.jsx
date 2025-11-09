import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import Swal from 'sweetalert2';
const Navbar = ({setShowLogin,menu, setMenu}) => {
  const {user, handlelogout, getTotalCartAmount} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='navbar'>
        <div className='display'>
        <Link to='/'><img src="https://ik.imagekit.io/abdulwahab/images/logo.png?updatedAt=1748609300504" alt="logo image" className='logo'/></Link>
        <h1>Arab Spice</h1>
        </div>
        <ul className='navbar-menu'>
            <Link to='/' onClick={() => {setMenu("home")}} className={menu === "home"?"active":"default"}>Home</Link>
            <a id='hide' href='#about-us' onClick={() => {setMenu("about-us")}} className={menu === "about-us"?"active":"default"}>About Us</a>
            <Link to='/menu' onClick={() => {setMenu("menu")}} className={menu === "menu"?"active":"default"}>Menu</Link>
            <a id='hide' href='#footer' onClick={() => {setMenu("contact-us")}} className={menu === "contact-us"?"active":"default"}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <div className="navbar-basket-icon">
                <Link to='/cart'><img src="https://ik.imagekit.io/abdulwahab/images/basket_icon.jpg?updatedAt=1748609403362" alt="cart icon" className='basket-icon'/></Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            {user === "" ? <button onClick={() => setShowLogin(true)}>Sign in</button> : 
            <div className="dropdown">
              <img src="https://ik.imagekit.io/abdulwahab/images/profile.png?updatedAt=1748609998901" className='profile-image' alt='profile image'/>
              <div className="dropdown-content">
                <Link to='/myorders'><p>My Orders</p></Link>
                <Link to='/wishlist'><p>Wishlist</p></Link>
                <p onClick={() => {
                  handlelogout();
                  navigate('/');
                  setMenu("home");
                  Swal.fire({
                    title: "Good job!",
                    text: "Logged Out Successfully!",
                    icon: "success",
                    scrollbarPadding: false
                  });
                }}>Log Out</p>
              </div>
            </div>
            }
        </div>
    </div>
  )
}
export default Navbar