"use client";

import React, {useState} from 'react'

import { Eye, EyeOff } from "lucide-react";
import InputBox from "@/app/custom_components/InputBox";
import { signUpWithEmailAndPassword } from "@/supabase/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
    firstName: "",
    lastName: "",
  });

  const router = useRouter();
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleCOnfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Form methods
  const onInputHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.log("password does not match");
      return;
    }

    console.log(formData)
    const result = await signUpWithEmailAndPassword(
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.firstName,
      formData.middleName,
      formData.lastName,
      formData.role
    );
    const { error } = JSON.parse(result);

    console.log(JSON.parse(result));
    if (error) {
      console.log(error.message);
    } else {
      router.push("/pages/login");
    }
  };

  return (
    <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
    <div className="flex gap-4 justify-between mb-2">
      <div className="w-full">
        <label htmlFor="firstName" className="font-semibold">
          First name
        </label>
        <Input
          id="firstName"
          type="text"
          placeholder="e.g. John"
          name="firstName"
          className="mt-2"
          onInputHandleChange={onInputHandleChange}
        ></Input>
      </div>
      <div className="w-full">
        <label htmlFor="lastName" className="font-semibold">
          Last name
        </label>
        <Input
          id="lastName"
          type="text"
          placeholder="e.g. Doe"
          name="lastName"
          className="mt-2"
          onInputHandleChange={onInputHandleChange}
        ></Input>
      </div>
    </div>
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
        <div className="relative mb-2">
        <p className="font-bold mb-1">Password</p>
        <div className="relative flex items-center">
            <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            className="mt-2"
            placeholder="********"
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
        <div className="relative mb-2">
        <p className="font-bold mb-1">Confirm Password</p>
        <div className="relative flex items-center">
            <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            className="mt-2"
            placeholder="********"
            onInputHandleChange={onInputHandleChange}
            />
            <button
            type="button"
            className="absolute max-h-full inset-y-0 right-0 flex items-center justify-center w-10 mt-1 h-full text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={toggleCOnfirmPassword}
            >
            {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
            ) : (
                <Eye className="h-5 w-5" />
            )}
            </button>
        </div>
        </div>

        <Button type="submit" variant="default" size="xl" className="mt-2">
        Sign up
        </Button>
        <div className="flex justify-center mt-4 gap-2">
        <span>Already have an account?</span>
        <Link
            href="/pages/signup"
            className="flex justify-center items-center text-forgotPassword"
        >
            <Button variant="link" size="link-md">
            Sign in
            </Button>
            {/* <ArrowUpRight /> */}
        </Link>
        </div>
    </form>
  )
}

export default SignupForm