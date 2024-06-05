"use client";

import React, { useState, useTransition } from "react";

import Link from "next/link";

import {
  signInWithEmailAndPassword,
} from "@/supabase/actions";
import { CircularProgress } from "@mui/material";

import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import InputBox from "@/app/custom_components/InputBox";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { redirect, useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Form functions
  const onInputHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signInWithEmailAndPassword(
      formData.email,
      formData.password
    );
    const { data, error } = JSON.parse(result);
    console.log(data);

    if (!error) {
      router.push("/");
    } else {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
    <div className="mb-2">
      <label htmlFor="email" className="font-semibold">
        Email
      </label>
      <Input
        id="email"
        type="email"
        placeholder="e.g. johndoe@email.com"
        name="email"
        className="mt-2"
        onInputHandleChange={onInputHandleChange}
      ></Input>
    </div>

    <div className="relative">
      <label htmlFor="password" className="font-semibold">
        Password
      </label>
      <div className="relative flex items-center">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          className="mt-2"
          onInputHandleChange={onInputHandleChange}
        />
        <button
          type="button"
          className="absolute max-h-full inset-y-0 right-0 flex items-center justify-center w-10 mt-1 h-full text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>

    <div className="flex items-center justify-between mt-4 mb-4">
      <div className="flex items-center gap-2 cursor-pointer">
        {/* <input type="checkbox" className="mr-2" />
      <p className="font-bold">Remember Me</p> */}
        <Checkbox id="remember-me" />
        <label
          htmlFor="remember-me"
          className="text-checkbox-text text-sm font-normal cursor-pointer select-none"
        >
          Remember me
        </label>
      </div>
      <Link
        href="/pages/forgot_password
    "
      >
        {/* <p className="text-forgotPassword font-semibold">
        Forgot Password?
      </p> */}
        <Button variant="link" size="link">
          Forgot password?
        </Button>
      </Link>
    </div>
    <Button type="submit" variant="default" size="xl">
      Login
    </Button>
    {/* <button
    type="submit"
    className="flex justify-center items-center gap-4 font-semibold border-solid border rounded-sm border-buttonColor py-2 text-s mt-3 w-full text-white bg-forgotPassword"
    >
    Login
    <CircularProgress className={isPending ? "animate-spin" : "hidden"}/>
    </button> */}
    <div className="flex justify-center mt-4 gap-2">
      <span>Not registered yet?</span>
      <Link
        href="/pages/signup"
        className="flex justify-center items-center text-forgotPassword"
      >
        <Button variant="link" size="link-md">
          Create an account
        </Button>
        {/* <ArrowUpRight /> */}
      </Link>
    </div>
    </form>
  )
}

export default LoginForm;

