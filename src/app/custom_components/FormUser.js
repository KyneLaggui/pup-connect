"use client"
import React, { useState } from 'react'
import StepperControl from './StepperControl'
import StepperForm from './StepperForm'
import BasicInformation from './userSteps/BasicInformation'
import Experience from './userSteps/Experience'
import CoverLetterResume from './userSteps/CoverLetterResume'
import Final from './userSteps/Final'
import {StepperContext} from './StepperContext'

const FormUser = () => {

  const [currentStep, setCurrentStep] = useState(1)  
  const [userData, setUserData] = useState("")
  const [finalData, setFinalData] = useState([]);
  const steps = [
    "Basic Information",
    "Experience",
    "Cover Letter and Resume",
    "Complete"
  ];  

  const displayStep = (step) => {
    switch(step) {
        case 1:
            return < BasicInformation />
        case 2:
            return < Experience />
        case 3:
            return < CoverLetterResume />
        case 4:
            return < Final />
        default:
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }

  return (
    <div className='md: w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white'>
        <div className='container horizontal mt-5'>
            <StepperForm steps={steps} currentStep={currentStep}/>
        </div>
        
        <div className='my-10 py-10'>
            <StepperContext.Provider value={{
                userData,
                setUserData,
                finalData,
                setFinalData
            }}>
                {displayStep(currentStep)}
            </StepperContext.Provider>
        </div>

        <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
    </div>
  )
}

export default FormUser
