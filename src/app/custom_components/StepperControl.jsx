import { Button } from '@/components/ui/button'
import React from 'react'

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className='container flex justify-around mt-4 mb-8'>
      <Button variant="secondary" size="lg" onClick={()=>handleClick("")} className={`${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`} >Back</Button>
      <Button size="lg" onClick={()=>handleClick("next")}>{currentStep === steps.length -1 ? "Confirm" : "Next"}</Button>
    </div>
  )
}

export default StepperControl
