"use client";
import React, { useState } from "react";
import StepperControl from "./StepperControl";
import StepperForm from "./StepperForm";
import BasicInformation from "./companySteps/BasicInformation";
import ContactInfo from "./companySteps/ContactInfo";
import Tags from "./companySteps/Tags";
import { StepperContext } from "./StepperContext";
import Final from "./userSteps/Final";

const FormUser = () => {
  const [currentStep, setCurrentStep] = useState(1); // track current step
  const [companyData, setCompanyData] = useState(""); // store user data
  const [finalData, setFinalData] = useState([]); // store final data

  // Initializing all the possible steps titles
  const steps = ["Account Info", "Basic Info", "Tags", "Complete"];

  // Displaying the step based on the current step
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <ContactInfo />;
      case 2:
        return <BasicInformation />;
      case 3:
        return <Tags />;
      case 4:
        return <Final />;
      default:
    }
  };

  // Handling the next and previous button
  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep); // update the current step
  };

  return (
    <div className="wrapper">
      <div className="flex flex-col justify-between w-full md:w-[40rem] h-fit mx-auto py-10 px-8 bg-background border shadow-sm rounded-xl">
        <div className="">
          <div className="container horizontal mt-5 mb-20">
            <StepperForm steps={steps} currentStep={currentStep} />
          </div>

          <div className="mb-6 pb-4 px-10">
            <StepperContext.Provider
              value={{
                companyData,
                setCompanyData,
                finalData,
                setFinalData,
              }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>

        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      </div>
    </div>
  );
};

export default FormUser;
