"use client"

import React, { useState } from 'react';
import { ArrowUpRight, Eye, EyeOff, PenLine, SquarePen } from 'lucide-react';
import NavBar from "@/app/custom_components/NavBar";
import InputBox from "@/app/custom_components/InputBox";
import { supabase } from "@/supabase/config"
import Link from 'next/link';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] =  useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'applicant',
    firstName: '',
    lastName: ''
  })

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleCOnfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

    // Form methods
    const onInputHandleChange = (event) => {
      const {name, value} = event.target;
      setFormData({
        ...formData,
        [name]: value
      })
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('okay')
    try {
      console.log(formData)
        const { data, error } = await supabase.auth.signUp(
            // Need to lowercase email to safely compare it in the future
            {
                email: formData.email.toLowerCase(),
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        role: formData.role,
                        firstName: formData.firstName,
                        middleName: formData.middleName,
                        lastName: formData.lastName,
                    }
                }
            }
        )
        if (error) throw error;

    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavBar />
      <div className="relative *:flex flex-col justify-center max-w-md mx-auto gap-1 mt-20 sm:px-0 px-4">
        <h1 className="font-bold text-3xl">Sign Up</h1>
        <p className="font-medium text-s">Create your account&nbsp; <SquarePen className="w-[18px]"/></p>
        {/* <div className="flex flex-col items-center w-full gap-4 my-4 mb-8">
          <button className="flex justify-center items-center gap-4 font-semibold border-solid border rounded-sm border-buttonColor py-2 text-s mt-3 w-full">
            <Image
              src="/assets/google_icon.svg"
              width={15}
              height={15}
              alt="Google Logo"
            />
            <span>Sign Up with Google</span>
          </button>
          <div className="relative mt-3 w-full">
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-[1px] bg-gray-400"></div>
            <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 max-w-[80%] truncate text-sm text-gray-400">
              or Login with Email
            </p>
          </div>
        </div> */}
        <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div>
              <p className="font-bold mb-1">First name</p>
              <InputBox type="text" name="firstName" onInputHandleChange={onInputHandleChange}/>
            </div>
            <div>
              <p className="font-bold mb-1" name="lastName">Last name</p>
              <InputBox type="text" name="lastName" onInputHandleChange={onInputHandleChange}/>
            </div>
          </div>
          <div>
            <p className="font-bold mb-1" name="email">Email</p>
            <InputBox type="text" name="email" onInputHandleChange={onInputHandleChange}/>
          </div>
          <div className="relative">
            <p className="font-bold mb-1">Password</p>
            <div className="relative flex items-center">
            <InputBox 
              type={showPassword ? "text" : "password"}
              className="absolute max-h-full inset-y-0 right-0 flex items-center justify-center w-10 h-full text-gray-400 hover:text-gray-600 focus:outline-none"
              name="password" 
              onInputHandleChange={onInputHandleChange}  
            />
              <button
                type="button"  
                className="absolute right-2 top-1/2 transform -translate-y-1/2"    
                onClick={handleTogglePassword}          
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="relative">
            <p className="font-bold mb-1">Confirm Password</p>
            <div className="relative flex items-center">
            <InputBox 
              type={showConfirmPassword ? "text" : "password"}
              className="absolute max-h-full inset-y-0 right-0 flex items-center justify-center w-10 h-full text-gray-400 hover:text-gray-600 focus:outline-none"
              name="confirmPassword" 
              onInputHandleChange={onInputHandleChange}
            />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"    
                onClick={toggleCOnfirmPassword}          
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <p className="font-bold">Remember Me</p>
            </div>
            <Link href="/pages/forgot_password
            ">
              <p className="text-forgotPassword font-semibold">Forgot Password?</p>        
            </Link>
          </div>
          <button type="submit" className="flex justify-center items-center gap-4 font-semibold border-solid border rounded-sm border-buttonColor py-2 text-s mt-3 w-full text-white bg-forgotPassword">
            Sign Up
          </button>
          <div className="flex justify-center mt-4">
            Already have an account?&nbsp;<Link href="/pages/login" className="flex justify-center items-center text-forgotPassword"><p className="text-forgotPassword font-semibold">Login</p><ArrowUpRight /></Link>
          </div>
        </form>
      </div>
    </>
    
  );
};

export default Signup;
