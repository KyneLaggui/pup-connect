import NavBar from "@/app/custom_components/NavBar";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="min-h-[300dvh]">
        {/* <NavBar /> */}

        <div className="w-full fixed ">
          <div className="container">
            <div>© 2024 PUP Connect. All rights reserved.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
