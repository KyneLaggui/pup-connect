"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StepperControl from "./StepperControl";
import StepperForm from "./StepperForm";
import BasicInformation from "./userSteps/BasicInformation";
import ContactInfo from "./userSteps/ContactInfo";
import Experience from "./userSteps/Experience";
import CoverLetterResume from "./userSteps/CoverLetterResume";
import Final from "./userSteps/Final";
import { StepperContext } from "./StepperContext";
import { supabase } from "@/utils/supabase/client";

const FormUser = ({ email }) => {
  const [currentStep, setCurrentStep] = useState(1); // track current step
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: null,
    gender: "",
    email: "",
    phoneNumber: "",
    region: "",
    regionCode: "",
    cityOrProvince: "",
    streetAddress: "",
    coverLetter: "",
    additionalNotes: "",
    resume: null,
    socialLinks: []
  }); // store user data
  const [finalData, setFinalData] = useState([]); // store final data
  const [invalidFields, setInvalidFields] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    gender: false,
    email: false,
    phoneNumber: false,
    address: false,
    region: false,
    cityOrProvince: false,
    streetAddress: false,
    coverLetter: false,
    resume: false,
  }); // track invalid fields

  const router = useRouter()
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

  const checkEmpty = (value) => {
    return value === "";
  };

  const isDateCurrentOrFuture = (dateToCheck) => {
    // Get the current date and time
    const currentDate = new Date();

    // Create a Date object from the dateToCheck string
    const checkDate = new Date(dateToCheck);

    // Check if the given date is greater than or equal to the current date
    if (checkDate >= currentDate) {
        return true;
    } else {
        return false;
    }
}
  const isValidPhilippinesMobileNumber = (phoneNumber) => {
    // Define the regular expression pattern for mobile numbers
    const mobilePattern = /^(?:\+63|0)9\d{9}$/;

    // Remove spaces from the phone number for easier matching
    phoneNumber = phoneNumber.replace(/\s+/g, '');

    // Check if the phone number matches the mobile pattern
    return mobilePattern.test(phoneNumber);
  }


  // Handling the next and previous button
  const handleClick = (direction) => {
    let newStep = currentStep;
    let newInvalidFields = {};

    if (direction === "confirm") {
      router.push('/');
    } else if (direction === "next") {
      if (newStep === 1) {
        if (checkEmpty(userData.firstName)) newInvalidFields.firstName = true;
        if (checkEmpty(userData.lastName)) newInvalidFields.lastName = true;
        if (!userData.birthDate || isDateCurrentOrFuture(userData.birthDate) ) newInvalidFields.birthDate = true;
        if (checkEmpty(userData.gender)) newInvalidFields.gender = true;
      } else if (newStep === 2) {
        if (checkEmpty(userData.email)) newInvalidFields.email = true;
        if (checkEmpty(userData.phoneNumber) || !isValidPhilippinesMobileNumber(userData.phoneNumber)) newInvalidFields.phoneNumber = true;
        if (checkEmpty(userData.region)) newInvalidFields.region = true;
        if (checkEmpty(userData.cityOrProvince)) newInvalidFields.cityOrProvince = true;
        if (checkEmpty(userData.streetAddress)) newInvalidFields.streetAddress = true;
      } else if (newStep === 3) {
        if (checkEmpty(userData.coverLetter)) newInvalidFields.coverLetter = true;
        if (!userData.resume) newInvalidFields.resume = true;
        if (userData.resume && ((userData.resume.name).split('.').pop().toLowerCase() !== 'pdf' 
        || (userData.resume.type) !== 'application/pdf'))  {
          newInvalidFields.resume = true
        }
      }
      
      if (Object.keys(newInvalidFields).length > 0) {
        setInvalidFields(newInvalidFields);
        console.log('A required input is empty');
      } else {
        newStep++;
        setInvalidFields({});
      }
    } else {
      newStep--
    }

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep); // update the current step
  };

  useEffect(() => {
    const fetchCurrentData = async() => {
      if (email) {
        const { data } = await supabase
        .from('applicant')
        .select('email, first_name, last_name')
        .eq('email', email)
        .single()

        if (data) {
          setUserData({
            ...userData,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name
          });
        }
      }
    }

    fetchCurrentData();
  }, [email]);

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
                invalidFields,
                setInvalidFields
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
