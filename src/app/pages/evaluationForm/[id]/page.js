"use client"

import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'
import React from 'react'
import { evalQuestions } from '@/app/constants'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <ApplicantOnlyPage>
        <div className='flex mt-10'>
            <div className='w-full justify-start container-sidebar  items-center '>    
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-lg font-medium'>Evaluation form</h1>
                        <h1 className='text-2xl font-semibold text-primary'>Accenture Philippines</h1>
                    </div>
                    
                    {evalQuestions.map((evalqs, number)=>(
                        <div key={number} className='flex flex-col gap-5 border border-checkbox-border bg-[#f9f9f9] rounded-md p-7 pb-8'>
                            <div className='flex gap-4'>
                                <p>{evalqs.number}.</p>
                                <h1>{evalqs.question}</h1>
                            </div>
                            <RadioGroup className="gap-3 ml-8">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="very_dissatisfied" id="r1" />
                                    <Label htmlFor="r1">Very Dissatisfied</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="dissatisfied" id="r2" />
                                    <Label htmlFor="r2">Dissatisfied</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="neutral" id="r3" />
                                    <Label htmlFor="r3">Neutral</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="satisfied" id="r4" />
                                    <Label htmlFor="r4">Satisfied</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="very_satisfied" id="r5" />
                                    <Label htmlFor="r5">Very Satisfied</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                    ))}
                    <Button size="lg">Submit</Button>
                </div>
                
            </div>
            
        </div>
    </ApplicantOnlyPage>
  )
}

export default page
