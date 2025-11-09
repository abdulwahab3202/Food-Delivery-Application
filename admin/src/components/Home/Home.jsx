import React, { useContext } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  const start = () => {
    const admin = localStorage.getItem("user");
    if (admin !== null) {
      navigate('/admin');
    }
    else {
      navigate('/login');
    }
  }
  return (
    <div className="home">
      <div className="home-contents">
        <h2>Welcome to the<br/>Admin Panel</h2>
        <button onClick={start}>GET STARTED</button>
      </div>
    </div>
  )
}

export default Home