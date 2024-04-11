import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1200px] flex w-full justify-between py-5 items-center">
        <div>
          <h1 className="text-logo font-semibold">PUP Connect</h1>
        </div>
        <div>
          <p>Hero</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Sign up</Button>
          <Button variant="default">Sign in</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
