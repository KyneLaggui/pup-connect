import React from 'react'
import NavBar from '@/app/custom_components/NavBar';
import Image from "next/image";
import { microsoftLogo } from '@assets/index';
import FormsLabel from '@/app/custom_components/FormsLabel';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"


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

            <div className='flex flex-col gap-2 p-5 border border-checkbox-border rounded-md'>
                <h1 className='mb-3 text-lg font-medium'>Basic Information</h1>
                <div className='flex justify-between gap-6  '>
                    <div className='flex flex-col gap-2 w-full'>
                        <FormsLabel text="First Name" label="firstname" />
                        <Input type="text" name="firstName"/>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <FormsLabel text="Last Name" label="lastname" />
                        <Input type="text" name="lastName"/>
                    </div>
                </div>

                <div className='flex justify-start gap-6 '>
                    <div className='flex flex-col gap-2 w-full'>
                        <FormsLabel text="Email" label="email" />
                        <Input type="email" name="emailAdd"/>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <FormsLabel text="Phone (Optional)" label="phone" />
                        <Input type="tel" name="phoneNum"/>
                    </div>
                </div>

                <div >
                    <FormsLabel text="Address" label="address" />
                    <Input type="text" name="address"/>
                </div>
            </div>

            <div className='flex flex-col gap-2 p-5 border border-checkbox-border rounded-md'>
                <h1 className='mb-3 text-lg font-medium'>Education</h1>
                <div className='flex justify-between gap-6  '>
                    <div className='flex flex-col gap-2 w-full'>
                        <FormsLabel text="Branch" label="branchSchool" />
                        <Input type="text" name="branchSchool"/>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <FormsLabel text="Course" label="courseSchool" />
                        <Input type="text" name="courseSchool"/>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <FormsLabel text="Year" label="yearSchool" />
                        <Input type="text" name="yearSchool"/>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 p-5 border border-checkbox-border rounded-md'>
                <h1 className='mb-3 text-lg font-medium'>Cover Letter and Resume</h1>
                <div className='flex flex-col gap-2 w-full'>
                    <FormsLabel text="Cover Letter" label="coverLetter" />
                    <Textarea className=" border border-input-border bg-input resize-none min-h-[120px]" name="coverLetter" />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <FormsLabel text="Resume / Curriculum Vitae" label="formsLetter" />
                    <Input type="file" name="formsLetter" className="text-forms-placeholder"/>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <FormsLabel text="Additional Notes" label="additionalLetter" />
                    <Textarea className=" border border-input-border bg-input resize-none min-h-[120px]" name="additionalLetter" />
                </div>
            </div>

            <div className='flex flex-col gap-2 p-5 border border-checkbox-border rounded-md'>
                <h1 className='mb-3 text-lg font-medium'>Social Links</h1>
                <Input type="text" name="coverLetter"/>
                <Input type="text" name="coverLetter"/>
                
            </div>


        </div>
      </div>
    </div>
  )
}

export default page
