"use client"

import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'
import React from 'react'
import { evalQuestions } from '@/app/constants'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'

const page = () => {
  return (
    <ApplicantOnlyPage>
        <div className='flex'>
            <div className='w-full justify-start container-sidebar gap-5 items-center max-w-[400px] border border-red-500 '>
                <h1>Evaluation form for Accenture Philippines</h1>
                {evalQuestions.map((evalqs, number)=>(
                    <div key={number} className='flex flex-col gap-5 '>
                        <div className='flex gap-4'>
                            <p>{evalqs.number}.</p>
                            <h1>{evalqs.question}</h1>
                        </div>
                        <RadioGroup className="gap-3 ml-6">
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
            </div>
            
        </div>
    </ApplicantOnlyPage>
  )
}

export default page
