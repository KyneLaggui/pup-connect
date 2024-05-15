"use client"
import React, { useState } from 'react'
import StepperControl from './StepperControl'
import StepperForm from './StepperForm'
import BasicInformation from './userSteps/BasicInformation'
import Experience from './userSteps/Experience'
import CoverLetterResume from './userSteps/CoverLetterResume'
import Final from './userSteps/Final'


const FormUser = () => {

  const [currentStep, setCurrent] = useState(1)  
  const steps = [
    "Basic Information",
    "Experience",
    "Cover Letter and Resume",
    "Complete"
  ];  

  const displaySteps = (step) => {
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

  return (
    <div className='md: w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white'>
        <div className='container horizontal mt-5'>
            <StepperForm />
        </div>
        
        <StepperControl />
    </div>
  )
}

export default FormUser
