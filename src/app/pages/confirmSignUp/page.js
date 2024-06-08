"use client"
import React, { useState, useEffect } from 'react'
import FormUser from '../../custom_components/FormUser'
import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'
import { supabase } from "@/utils/supabase/client";
import { selectEmail, selectSetupFinished } from '@/redux/slice/authSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'

const Page = () => {
  const userEmail = useSelector(selectEmail)
  const setUpFinished = useSelector(selectSetupFinished)
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: null,
    firstName: null,
    lastName: null,
  })

  useEffect(() => {
    const getData = async() => {
      const { data } = await supabase
      .from('profile')
      .select('email, first_name, last_name')
      .eq('email', userEmail)
      .single()

      if (data) {
        setUserData({
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
        })
      }
    }    

    getData()

  }, [userEmail])

  useEffect(() => {
    if (setUpFinished) {
      router.push("/")
    }
  }, [setUpFinished])

  return (
    <ApplicantOnlyPage>
      <div className='mt-20 mb-20'>
          <FormUser email={userData.email} firstName={userData.firstName} lastName={userData.lastName}/>
        </div>
    </ApplicantOnlyPage>
  )
}

export default Page
