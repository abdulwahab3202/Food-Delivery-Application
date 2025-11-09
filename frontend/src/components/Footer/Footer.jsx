import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
export const Footer = ({setMenu}) => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-one">
                    <div className="footer-logo">
                        <img className='footer-logo-img' src="https://ik.imagekit.io/abdulwahab/images/logo.png?updatedAt=1748609300504" alt="logo" />
                        <h1>Arab Spice</h1>
                    </div>
                    <div className="footer-email footer-email-phone-location">
                        <i className="fa-solid fa-envelope"></i>
                        <p className='hover'>info@arabspice.com</p>
                    </div>
                    <div className="footer-phone footer-email-phone-location">
                        <i className="fa-solid fa-phone"></i>
                        <p className='hover'>910 468 587 1235</p>
                    </div>
                    <div className="footer-location footer-email-phone-location">
                        <i className="fa-solid fa-location-dot"></i>
                        <p className='hover'>Coimbatore, India</p>
                    </div>
                </div>
                <div className="footer-content-two">
                    <h2>Information</h2>
                    <Link to='/'><p className='hover' onClick={() => {
                        setMenu("home");
                        window.scrollTo(0,0);
                    }}>Home</p></Link>
                    <p className='hover' onClick={() => window.scrollTo(0,650)}>About Us</p>
                    <Link to='/menu'><p className='hover' onClick={() => {
                        setMenu("menu");
                        window.scrollTo(0,0);
                    }}>Menu</p></Link>
                    <Link to='/menu'><p className='hover' onClick={() => {
                        setMenu("menu");
                        window.scrollTo(0,0);
                    }}>Dishes</p></Link>
                </div>
                <div className="footer-content-three">
                    <h2>Useful Links</h2>
                    <p className='hover' onClick={() => window.scrollTo(0,0)}>Services</p>
                    <p className='hover' onClick={() => window.scrollTo(0,0)}>Privacy Terms</p>
                    <p className='hover' onClick={() => window.scrollTo(0,0)}>Help & Support</p>
                    <p className='hover' onClick={() => window.scrollTo(0,0)}>Terms & Conditions</p>
                </div>
                <div className="footer-content-four">
                    <h2>Social Media</h2>
                    <div className="linkedin-twitter-facebook-instagram">
                        <i className="fa-brands fa-linkedin"></i>
                        <a href="https://www.linkedin.com/in/abdul-wahab-a926a6293" target="_blank" className='hover'>LinkedIn</a>
                    </div>  
                    <div className="linkedin-twitter-facebook-instagram">
                        <i className="fa-brands fa-twitter"></i>
                        <a href="https://x.com/SpiceArab?t=FGYBwcB5KdItyoUERPdH-A&s=09" target="_blank" className='hover'>Twitter</a>
                    </div>
                    <div className="linkedin-twitter-facebook-instagram">
                        <i className="fa-brands fa-facebook"></i>
                        <a href="https://www.facebook.com/share/1EN7urpnqh/" target="_blank" className='hover'>Facebook</a>
                    </div>                  
                    <div className="linkedin-twitter-facebook-instagram">
                        <i className="fa-brands fa-instagram"></i>
                        <a href="https://www.instagram.com/arab_spice?igsh=ZTI5djJuaGt6cjd5" target="_blank" className='hover'>Instagram</a>
                    </div>
                </div>
            </div>
            <br /><br />
            <div>
                <p className='footer-copyright'>Copyright 2025 © ArabSpice.com - All Rights Reserved.</p>
            </div>
            <br />
        </div>
    )
}