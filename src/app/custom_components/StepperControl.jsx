import { Button } from '@/components/ui/button'
import React from 'react'

const StepperControl = () => {
  return (
    <div className='container flex justify-around mt-4 mb-8'>
      <Button variant="secondary" size="lg">Back</Button>
      <Button size="lg">Next</Button>
    </div>
  )
}

export default StepperControl
