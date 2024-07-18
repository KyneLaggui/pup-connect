"use client"
import React, { useState, useEffect } from 'react'
import FormUser from '../../custom_components/FormUser'
import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'
import CompanyOnlyPage from '@/app/layouts/CompanyOnlyPage'
import { supabase } from "@/utils/supabase/client";
import { selectEmail, selectSetupFinished } from '@/redux/slice/authSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import FetchUserStatus from '@/app/custom_hooks/FetchUserStatus';
import FormCompany from '../../custom_components/FormCompany';
import VerificationCheck from "@/app/layouts/VerificationCheck";


const Page = () => {
  const [userData, setUserData] = useState({
    email: null,
    role: null,
  })

  const userEmail = useSelector(selectEmail)
  const { userStatus } = FetchUserStatus()
  const router = useRouter();


  useEffect(() => {

    const getData = async() => {
      const { data } = await supabase
      .from('profile')
      .select('email, role')
      .eq('email', userEmail)
      .single()

      if (data) {
        setUserData({
          email: data.email,
          role: data.role
        })
      }
    }    

    getData()
  }, [userEmail])

  useEffect(() => {
    if (userStatus && userStatus.setup_finished) {
      router.push("/")
    }
  }, [userStatus])

  return (
    <VerificationCheck>
      <div className='mt-20 mb-20'>
        {
          userData.role === 'applicant' && (
            <ApplicantOnlyPage>
              <FormUser email={userData.email} />
            </ApplicantOnlyPage>
          )
        }
        {
          userData.role === 'company' && (
            <CompanyOnlyPage>
              <FormCompany email={userData.email} />
            </CompanyOnlyPage>
          )
        }          
      </div>
    </VerificationCheck>      
  )
}

export default Page
