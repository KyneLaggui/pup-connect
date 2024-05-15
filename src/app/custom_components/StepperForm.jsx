import React from 'react'

const StepperForm = () => {
  return (
    <div className='mx-4 px-4 flex justify-between items-center'>
      <div className='relative flex flex-col items-center'>
        <div className='rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3'>
            1   
        </div>
        <div className='absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase'>
          Description
        </div>
      </div>
      <div className='flex-auto border-t-2 transition duration-500 ease-in-out'></div>
    </div>
  )
}

export default StepperForm
