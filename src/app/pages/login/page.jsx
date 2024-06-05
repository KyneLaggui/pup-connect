"use client"
import WavingHandIcon from "@mui/icons-material/WavingHand";

import LoggedOutOnly from "@/app/layouts/LoggedOutOnly";

import LoginForm from './LoginForm';

const Login = () => {
  return (
    <LoggedOutOnly>
      <div className="relative wrapper">
        <div className="flex flex-col justify-center gap-1 max-w-lg mx-auto border py-10 px-8 rounded-xl bg-background shadow-sm">
          <h1 className="font-bold text-2xl">Login</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">Hi, Welcome back</span>
            <WavingHandIcon className="w-[18px] text-yellow-400" />
          </div>
          <LoginForm />
        </div>
      </div>
    </LoggedOutOnly>
  );
};

export default Login;
