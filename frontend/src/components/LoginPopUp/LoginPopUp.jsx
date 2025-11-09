import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import Swal from 'sweetalert2';
import Google from '../GoogleAuth/Google';


const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useContext(StoreContext);

    const handlesignup = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, { name, email, password });
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            Swal.fire({
                title: "Signed in successfully",
                text: res.data.msg,
                icon: "success",
                scrollbarPadding: false
            });
            setShowLogin(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handlelogin = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, { email, password });
            if (res.data.success) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data.user);
                Swal.fire({
                    title: "Logged in successfully!",
                    text: res.data.msg,
                    icon: "success",
                    scrollbarPadding: false
                });
                setShowLogin(false);
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: res.data.msg,
                    icon: "error",
                    scrollbarPadding: false
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const alertPopUp = (e) => {
        e.preventDefault();
        if (currState === "Sign Up") {
            handlesignup();
        }
        else {
            handlelogin();
        }
    };
    useEffect(() => { console.log(user) }, [user]);

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={alertPopUp}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src="https://ik.imagekit.io/abdulwahab/images/cross_icon.png?updatedAt=1748610227001" alt="cross-icon" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <div className="login-popup-name login-popup-details">
                            <p>Name</p>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    )}
                    <div className="login-popup-email login-popup-details">
                        <p>E-mail</p>
                        <input
                            type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="login-popup-password login-popup-details">
                        <p>Password</p>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <Google setShowLogin={setShowLogin} />
                <div className="login-popup-condition">
                    <input type="checkbox" id="a" required />
                    <label htmlFor="a">By continuing, I agree to the terms of use & privacy policy.</label>
                </div>
                {currState === "Sign Up" ? (
                    <p className='question'>Already have an account?
                        <span onClick={() => setCurrState("Login")}> Login here</span>
                    </p>
                ) : (
                    <p>Create a new account?
                        <span onClick={() => setCurrState("Sign Up")}> Click here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
