import React from 'react'
import'./AboutUs.css';
const AboutUs = () => {
  return (
    <div className='about-us' id='about-us'>
        <div className="about-us-left">
            <div className="about-us-content">
                <h2>Who Are We?</h2><br />
                <p>We are a passionate team dedicated to bringing delicious, high-quality meals to your doorstep. Our mission is to provide a seamless food delivery experience with a focus on freshness, taste, and customer satisfaction. Whether you're craving a quick bite or a hearty meal, we ensure that every dish is prepared with care and delivered with love.</p>
            </div><br />
            <div className="about-us-one-two">
                <div className="about-us-one">
                    <img src="https://ik.imagekit.io/abdulwahab/images/restaurant.png?updatedAt=1748609795658" alt="restaurant image" />
                    <h2 className='h2'>Our Restaurant</h2>
                    <p className='para'>A place where passion for food meets with an excellence and enjoy around the world.</p>
                </div>
                <div className="about-us-two">
                  <img src="https://ik.imagekit.io/abdulwahab/images/server.png?updatedAt=1748609796024" alt="server image" />
                  <h2 className='h2'>Our Server</h2>
                  <p className='para'>Our friendly and dedicated ensures seamless dining and enjoy around the world enjoyed.</p>
                </div>
            </div>
            <div className="about-us-three-four">
                <div className="about-us-three">
                  <img src="https://ik.imagekit.io/abdulwahab/images/service.png?updatedAt=1748609797306" alt="service image" />
                  <h2 className='h2'>Our Service</h2>
                  <p className='para'>Fast, reliable, and have an customer focused dishes and enjoy around the world enjoyed.</p>
                </div>
                <div className="about-us-four">
                  <img src="https://ik.imagekit.io/abdulwahab/images/food.png?updatedAt=1748609773049" alt="food image" />
                  <h2 className='h2'>Our Food</h2>
                  <p className='para'>We offer a diverse menu of freshly prepared dishes and enjoy around the world enjoyed.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutUs