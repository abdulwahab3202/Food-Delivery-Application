import React, { useContext } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const clientId = "900090433661-9eu51aihutsfh3u0tcis5i5mq2a0496t.apps.googleusercontent.com";

export default function Google({setShowLogin}) {
    const navigate=useNavigate();

    const {googlelogin}=useContext(StoreContext);

    const handleLogin=async(details)=>{
        const res=await googlelogin(details);
        if(res.success){
           Swal.fire({
                  title: "Login Successful!",
                  text: "Welcome back!",
                  icon: "success",
                  scrollbarPadding: false
                });
                setShowLogin(false);
            navigate("/");
        }
        else{
            console.log("Login Failed");
        }
    }

    const onSuccess = (response) => {
        const decoded =jwtDecode(response.credential);
        const name=decoded.name;
        const email=decoded.email;
        handleLogin({name,email});
      };
    const onFailure = (error) => {
        console.log(error);
      };
    
      return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={onSuccess} onError={onFailure} theme="filled_black" />
        </GoogleOAuthProvider>
      );
}