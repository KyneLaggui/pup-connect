import { Input } from '@/components/ui/input'
import React, { useContext } from 'react'
import FormsLabel from '@/app/custom_components/FormsLabel';
import { StepperContext } from '../StepperContext';


const BasicInformation = () => {

  const {userData, setUserData} = useContext(StepperContext);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({ ...userData, [name]: value })
  }
  return (
    <div>
      <div className='flex flex-col gap-2 w-full'>
        <FormsLabel text="First Name" label="firstname" />
        <Input onChange={handleChange} value={userData["firstName"] || ""} type="text" name="firstName"/>
    </div>
    <div className='flex flex-col gap-2 w-full'>
        <FormsLabel text="Last Name" label="lastname" />
        <Input onChange={handleChange} value={userData["lastName"] || ""}type="text" name="lastName"/>
    </div>
    </div>
  )
}

export default BasicInformation
