import React, { useContext, useState } from 'react'
import './Container.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import Swal from 'sweetalert2';
const Container = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setAdmin} = useContext(StoreContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if((email === "abdul@gmail.com") && (password === "123")){
      Swal.fire({
        title: "Awesome!",
        text: "Logged In Successfully",
        icon: "success",
        scrollbarPadding: false
    });
        const userData = { name, email, password };
        localStorage.setItem("user", JSON.stringify(userData));
        setAdmin(userData);
        navigate('/admin');
    }
    else{
      Swal.fire({
        title: "Oops!",
        text: "Invalid Credentials",
        icon: "error",
        scrollbarPadding: false
    });
    }
}


  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleLogin}>
          <h2 className='login-popup-title'>Admin Login</h2>
        <div className="login-popup-inputs">
          <div className="login-popup-name login-popup-details">
            <p>Name</p>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="login-popup-email login-popup-details">
            <p>E-mail</p>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="login-popup-password login-popup-details">
            <p>Password</p>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Login</button>
        <div className="login-popup-condition">
          <input type="checkbox" id="a" required />
          <label htmlFor="a">By continuing, I agree to the terms of use & privacy policy.</label>
        </div>
      </form>
    </div>
  )
}

export default Container