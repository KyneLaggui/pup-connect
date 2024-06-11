"use client"
import WavingHandIcon from "@mui/icons-material/WavingHand";
import VerificationCheck from "@/layouts/VerificationCheck";
import SignupForm from './SignupForm';
import LoggedOutOnly from "@/app/layouts/LoggedOutOnly";

const Signup = () => {

  return (
    <LoggedOutOnly>
      <VerificationCheck>
        <div className="relative wrapper">
          <div className="flex flex-col justify-center gap-1 max-w-lg mx-auto border py-10 px-8 rounded-xl bg-background shadow-sm mb-20">
            <h1 className="font-bold text-2xl">Sign up</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm">Create your account</span>
              <WavingHandIcon className="w-[18px] text-yellow-400" />
            </div>
            <SignupForm />
          </div>
        </div>
      </VerificationCheck>
    </LoggedOutOnly>
  );
};

export default Signup;
