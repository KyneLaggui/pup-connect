import React from 'react'
import NavBar from '@/app/custom_components/NavBar';
import Image from "next/image";

const page = () => {
  return (
    <div className=''>
        <NavBar />
      <div className='mt-20 container flex items-center justify-center'>
        <div className='flex flex-col gap-6'>
            <div>
                <div>
                    <Image />
                    <h1>Microsoft Student</h1>
                </div>
                <div>
                    <p>Front-end Developer</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default page
