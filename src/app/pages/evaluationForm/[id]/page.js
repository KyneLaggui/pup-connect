"use client"

import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'
import React, { useState } from 'react'
import { evalQuestions } from '@/app/constants'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import VerificationCheck from "@/layouts/VerificationCheck";
import { supabase } from '@/utils/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import { Alert } from '@/app/custom_components/Alert'

const page = () => {
  const [answers, setAnswers] = useState({});
  const { id } = useParams();
  const router = useRouter();
  const handleAnswerChange = (questionNumber, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionNumber]: value,
    }));
  };

  const handleSubmit = () => {
    if (id) {
        const submitAnswer = async() => {
            const employeeDetail = await supabase
            .from('employee')
            .select('company_email')
            .eq('id', id)
            .single()

            const answerSubmission = await supabase
            .from('evaluation')
            .insert({
                employee_id: id,
                evaluation: answers,
                company_email: employeeDetail.data.company_email
            })

            if (!answerSubmission.error) {
                Alert("success", "Evaluation Successful", "Your company evaluation has been submitted!");  
                router.push('/')          
            } else {
            Alert(
                "error",
                "Evaluation Submission Failed",
                "An error has occured"
                );
            }
        }

        submitAnswer()
    }    
  };

  return (
    <ApplicantOnlyPage>
        <VerificationCheck>
            <div className='flex mt-10'>
                <div className='w-full justify-start container-sidebar items-center '>    
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-lg font-medium'>Evaluation form</h1>
                            <h1 className='text-2xl font-semibold text-primary'>Accenture Philippines</h1>
                        </div>
                        
                        {evalQuestions.map((evalqs, index) => (
                            <div key={index} className='flex flex-col gap-5 border border-checkbox-border bg-[#f9f9f9] rounded-md p-7 pb-8'>
                                <div className='flex gap-4'>
                                    <p>{evalqs.number}.</p>
                                    <h1>{evalqs.question}</h1>
                                </div>
                                <RadioGroup 
                                  className="gap-3 ml-8" 
                                  onValueChange={(value) => handleAnswerChange(evalqs.number, value)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="very_dissatisfied" id={`r1-${evalqs.number}`} />
                                        <Label htmlFor={`r1-${evalqs.number}`}>Very Dissatisfied</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="dissatisfied" id={`r2-${evalqs.number}`} />
                                        <Label htmlFor={`r2-${evalqs.number}`}>Dissatisfied</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="neutral" id={`r3-${evalqs.number}`} />
                                        <Label htmlFor={`r3-${evalqs.number}`}>Neutral</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="satisfied" id={`r4-${evalqs.number}`} />
                                        <Label htmlFor={`r4-${evalqs.number}`}>Satisfied</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="very_satisfied" id={`r5-${evalqs.number}`} />
                                        <Label htmlFor={`r5-${evalqs.number}`}>Very Satisfied</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        ))}
                        <Button size="lg" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </VerificationCheck>
    </ApplicantOnlyPage>
  )
}

export default page
