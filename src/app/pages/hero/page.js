import NavBar from "@/app/custom_components/NavBar";
import Footer from "@/app/custom_components/Footer";

import { Briefcase } from "lucide-react";

const Hero = () => {
  return (
    <>
      <div>
        <NavBar />
        <div className="container min-h-screen flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 mb-2 p-2 bg-tag py-[6px] px-[16px] w-fit rounded-full border-[1px] border-tag-border">
            <span className="text-sm text-tag-foreground">
              Make it happen today!
            </span>
            <Briefcase className="h-[14px] w-[14px] text-primary" />
          </div>

          <h1 className="text-5xl font-bold leading-tight text-center">
            Experience Matters:<br></br>
            <span className="bg-gradient-to-b from-primary-hover to-primary bg-clip-text text-transparent">
              Land Your Dream Internship Today
            </span>
          </h1>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Hero;
