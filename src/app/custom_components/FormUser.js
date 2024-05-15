import React from 'react'
import StepperControl from './StepperControl'
import StepperForm from './StepperForm'


const FormUser = () => {
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
