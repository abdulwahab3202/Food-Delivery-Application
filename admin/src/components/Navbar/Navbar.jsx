import React, { useContext } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Navbar = () => {
    const navigate = useNavigate();
    const admin = localStorage.getItem("user");
    return (
        <div className='navbar'>
            <div className='display'>
                <img src="https://ik.imagekit.io/abdulwahab/images/logo.png?updatedAt=1748609300504" alt="logo image" className='logo' onClick={() => { navigate('/') }} />
                <h1>Arab Spice</h1>
            </div>
            <div className="navbar-right">
                {admin === null ? <Link to='/login'><button>Log in</button></Link> :
                    <div className="dropdown">
                        <img src="https://ik.imagekit.io/abdulwahab/images/profile.png?updatedAt=1748609998901" className='profile-image' alt='profile image' />
                        <div className="dropdown-content">
                            <p onClick={() => {
                                localStorage.removeItem("user");
                                Swal.fire({
                                    title: "Cool!",
                                    text: "Logged out successfully",
                                    icon: "success",
                                    scrollbarPadding: false
                                });
                                navigate('/');
                            }}>Log Out</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default Navbar