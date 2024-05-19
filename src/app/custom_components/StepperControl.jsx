import { Button } from "@/components/ui/button";
import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="flex flex-wrap justify-between gap-4 px-10">
      <Button
        variant="secondary"
        size="lg"
        onClick={() => handleClick("")}
        className={`${
          currentStep === 1
            ? "opacity-60 cursor-not-allowed min-w-fit flex-1"
            : "min-w-fit flex-1"
        }`}
      >
        Back
      </Button>
      <Button
        size="lg"
        onClick={() => handleClick("next")}
        className="min-w-fit flex-1"
      >
        {currentStep === steps.length - 0 ? "Confirm" : "Next"}
      </Button>
    </div>
  );
};

export default StepperControl;
