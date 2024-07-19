"use client";
import React, { useEffect, useState } from "react";
import StepperControl from "./StepperControl";
import StepperForm from "./StepperForm";
import BasicInformation from "./companySteps/BasicInformation";
import AccountInfo from "./companySteps/AccountInfo";
import Tags from "./companySteps/Tags";
import { CompanyContext } from "./StepperContext";
import Final from "./companySteps/Final";
import { useRouter } from "next/navigation";
  
const FormCompany = ({ email }) => {
  const [currentStep, setCurrentStep] = useState(1); // track current step
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    region: "",
    regionCode: "",
    cityOrProvince: "",
    streetAddress: "",
    description: "",
    socialLinks: [],
    logo: null
  }); // store user data
  const [finalData, setFinalData] = useState([]); // store final data

  const [invalidFields, setInvalidFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    region: false,
    regionCode: false,
    cityOrProvince: false,
    streetAddress: false,
    description: false,
    logo: null,
    socialLinks: []
  }); // track invalid fields

  // Initializing all the possible steps titles
  const steps = ["Basic Info", "Account Info", "Tags", "Complete"];

  const router = useRouter();

  // Displaying the step based on the current step
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <BasicInformation />;
      case 2:
        return <AccountInfo />;
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

    if (direction === "confirm") {
      router.push('/');
    } else if (direction === "next") {
      newStep++
    } else {
      newStep--
    }

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep); // update the current step
  };

  useEffect(() => {
    setCompanyData({
      ...companyData,
      email: email,
    });
  }, [email]);

  return (
    <div className="wrapper">
      <div className="flex flex-col justify-between w-full md:w-[40rem] h-fit mx-auto py-10 px-8 bg-background border shadow-sm rounded-xl">
        <div className="">
          <div className="container horizontal mt-5 mb-20">
            <StepperForm steps={steps} currentStep={currentStep} />
          </div>

          <div className="mb-6 pb-4 px-10">
            <CompanyContext.Provider
              value={{
                companyData,
                setCompanyData,
                finalData,
                setFinalData,
                invalidFields,
                setInvalidFields
              }}
            >
              {displayStep(currentStep)}
            </CompanyContext.Provider>
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

export default FormCompany;
