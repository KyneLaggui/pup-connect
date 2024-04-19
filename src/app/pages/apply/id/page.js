import React from 'react'
import NavBar from '@/app/custom_components/NavBar';
import Image from "next/image";
import { microsoftLogo } from '@assets/index';
import FormsLabel from '@/app/custom_components/FormsLabel';
import FormsInput from '@/app/custom_components/FormsInput';


const page = () => {
  return (
    <div className=''>
        <NavBar />
      <div className='mt-20 container flex items-center justify-center '>
        <div className='flex flex-col gap-6 max-w-[800px] w-full px-2 pt-10 pb-[80px]'>

            <div className='flex flex-col gap-3 justify-center items-center'>
                <div className='flex gap-3 items-center'>
                    <Image 
                    src={microsoftLogo}
                    alt='Company logo'
                    className='w-[30px] h-[30px]'
                    
                    />
                    <h1 className='text-2xl font-semibold text-color-foreground '>Microsoft Student</h1>
                </div>
                <div>
                    <p className='text-xl font-semibold text-color-foreground'>Front-end Developer</p>
                </div>
            </div>

            <div className='flex flex-col gap-2 p-5'>
                <h1>Basic Information</h1>
                <div className='flex justify-evenly border border-red-500 w-full'>
                    <div border border-red-500>
                        <FormsLabel text="First Name" label="firstname" />
                        <FormsInput type="text" inputName="f_name"/>
                    </div>
                    <div>
                        <FormsLabel text="Last Name" label="lastname" />
                        <FormsInput type="text" inputName="l_name"/>
                    </div>
                </div>
                

            </div>
        </div>
      </div>
    </div>
  )
}

export default page
