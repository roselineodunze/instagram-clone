import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../../components/Auth/SignupForm";
import LoginForm from "../../../components/Auth/LoginForm";
import Googleauth from "../../../components/Auth/Googleauth";

const AuthForm = ({ isLogin }) => {

  // const navigate = useNavigate()

  // const handleAuth = () => {
  //   const {email, password, confirmPassword} = authData
  //   if (!email || !password || !confirmPassword){
  //       alert("Input all details")
  //       return
  //   }
  //   navigate("/")
  // }
  

  return (
    <div className="border-0 sm:border border-gray-800 p-5 max-w-[350px] rounded-md">
      <div className="flex justify-center items-center">
        <img src="/logo.png" className="h-24" />
      </div>

      {isLogin ? <LoginForm /> : <SignupForm />}

      <div className="flex items-center gap-1 mb-10">
        <div className="border w-[45%]"></div>
        <p className="w-[10%] text-center">OR</p>
        <div className="border w-[45%]"></div>
      </div>
      <Googleauth prefix={isLogin ? "Log in" : "Sign Up"}/>
    </div>
  );
};

export default AuthForm;
