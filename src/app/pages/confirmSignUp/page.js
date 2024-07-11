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

const Page = () => {
  const [userData, setUserData] = useState({
    email: null,
    firstName: null,
    lastName: null,
  })

  const userEmail = useSelector(selectEmail)
  const { userStatus } = FetchUserStatus()
  const router = useRouter();


  useEffect(() => {
    const getData = async() => {
      const { data } = await supabase
      .from('profile')
      .select('email, first_name, last_name, role')
      .eq('email', userEmail)
      .single()

      if (data) {
        setUserData({
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
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
   
      <div className='mt-20 mb-20'>
        {
          userData.role === 'applicant' && (
            <ApplicantOnlyPage>
              <FormUser email={userData.email} firstName={userData.firstName} lastName={userData.lastName}/>
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
  )
}

export default Page
