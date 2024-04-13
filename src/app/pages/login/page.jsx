import Image from 'next/image'
import React from 'react'

const login = () => {
  return (
    <div className="flex flex-col justify-center w-fit mx-auto gap-2">
        <h1 className="font-bold text-xl">Login</h1>
        <p className="font-semibold text-xs">Hi, Welcome back</p>
        <button className="flex justify-center items-center gap-4 font-semibold border-solid border rounded-sm border-buttonColor py-2 text-sm">
            <Image
                src="/assets/google_icon.svg"
                width={15}
                height={15}
                alt="Google Logo"
            />                
            <span>Login with Google</span>            
        </button>
        <p>or Login with Email</p>
        <div>
            <p>Email</p>
            <input type="text" />
        </div>
        <div>
            <p>Password</p>
            <input type="text" />
        </div>
        <div>
            <div>
                <p>Remember Me</p>
            </div>
            <p>Forgot Password?</p>
        </div>
        <button>Login</button>
        <div>
            Not registered yet? <span>Create an account</span>
        </div>
    </div>
  )
}

export default login