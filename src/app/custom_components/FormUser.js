"use client";
import React, { useState, useEffect } from "react";
import StepperControl from "./StepperControl";
import StepperForm from "./StepperForm";
import BasicInformation from "./userSteps/BasicInformation";
import ContactInfo from "./userSteps/ContactInfo";
import Experience from "./userSteps/Experience";
import CoverLetterResume from "./userSteps/CoverLetterResume";
import Final from "./userSteps/Final";
import { StepperContext } from "./StepperContext";
import { useSelector } from "react-redux";
import { selectEmail } from "@/redux/slice/authSlice"

const FormUser = ({ email, firstName, lastName }) => {
  const [currentStep, setCurrentStep] = useState(1); // track current step
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: null,
    gender: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    province: "",
    cityOrMunicipality: "",
    barangay: "",
    address: "",
    socialLinks: []
  }); // store user data
  const [finalData, setFinalData] = useState([]); // store final data

  // Initializing all the possible steps titles
  const steps = ["Basic Info", "Contact Info", "CV & Resume", "Complete"];

  // Displaying the step based on the current step  
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <BasicInformation />;
      case 2:
        return <ContactInfo />;
      case 3:
        return <CoverLetterResume />;
      case 4:
        return <Final />;
      default:
    }
  };

  // Handling the next and previous button
  const handleClick = (direction) => {
    let newStep = currentStep;
    if (direction === "next") {
      console.log('okay')
      newStep++
    } else {
      newStep--;
    }
    direction === "next" ? newStep++ : 
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep); // update the current step
  };

  useEffect(() => {
    setUserData({
      email: email,
      firstName: firstName,
      lastName: lastName
    })    
  }, [email, firstName, lastName])
  
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
                userData,
                setUserData,
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
