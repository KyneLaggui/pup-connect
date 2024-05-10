import WavingHandIcon from "@mui/icons-material/WavingHand";
import SignupForm from './SignupForm';
import LoggedOutOnly from "@/app/layouts/LoggedOutOnly";

const Signup = () => {

  return (
    <LoggedOutOnly>
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
    </LoggedOutOnly>
  );
};

export default Signup;
