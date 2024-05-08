"use client";

import React, { useState } from "react";
import { ArrowUpRight, Eye, EyeOff, PenLine, SquarePen } from "lucide-react";
import InputBox from "@/app/custom_components/InputBox";
import { signUpWithEmailAndPassword } from "@/supabase/actions";
import Link from "next/link";
import LoggedOutOnly from "@/app/layouts/LoggedOutOnly";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import WavingHandIcon from "@mui/icons-material/WavingHand";

const Signup = () => {
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
      router.push("/");
    }
  };

  return (
    <>
      <div className="relative wrapper">
        <div className="flex flex-col justify-center gap-1 max-w-lg mx-auto border py-10 px-8 rounded-xl bg-background shadow-sm mb-20">
          <h1 className="font-bold text-2xl">Sign up</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">Create your account</span>
            <WavingHandIcon className="w-[18px] text-yellow-400" />
          </div>
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
        </div>
      </div>
    </>
  );
};

export default Signup;
