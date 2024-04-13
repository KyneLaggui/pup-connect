import React from 'react'

const login = () => {
  return (
    <div className="flex flex-col justify-center w-fit mx-auto">
        <h1 className="text-logo font-bold">Login</h1>
        <p className="font-medium">Hi, Welcome back</p>
        <button className="font-semibold border-solid border rounded-sm border-">Login with Google</button>
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