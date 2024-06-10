import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  const [currentRightButton, setCurrentRightButton] = useState("Next");

  useEffect(() => {
    if (currentStep <= 2 ) {
      setCurrentRightButton("Next");
    } else if (currentStep === 3) {
      setCurrentRightButton("Submit");
    } else if (currentStep === 4) {
      setCurrentRightButton("Confirm");
    } 

  }, [currentStep])

  return (
    <div className="flex flex-wrap justify-between gap-4 px-10">
      {/* <Button
        variant="secondary"
        size="lg"
        onClick={() => handleClick("")}
        className={`${
          currentStep === 1 || currentStep === 4
            ? "opacity-60 cursor-not-allowed min-w-fit flex-1"
            : "min-w-fit flex-1"
        }`}
      >
        Back
      </Button> */}
      <Button
        variant="secondary"
        size="lg"
        onClick={() => handleClick("")}
        className={`${
          currentStep === 1 || currentStep === 4
            ? "hidden"
            : "min-w-fit flex-1"
        }`}
      >
        Back
      </Button>
      <Button
        size="lg"
        onClick={() => {
          if (currentStep < 4) {
            handleClick("next")
          } else {
            handleClick("confirm")
          }
        }}
        className="min-w-fit flex-1"
      >
        {/* {currentStep === steps.length - 0 ? "Confirm" : "Next"} */}
        {currentRightButton}
      </Button>
    </div>
  );
};

export default StepperControl;
