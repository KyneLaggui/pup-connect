"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { readUserSession, retrieveUser } from '../../../supabase/actions'

const ApplicantOnlyPage = ({ children }) => {
  const router = useRouter()

  // useEffect(() => {
  //   console.log(children)
  //   const checkUser = async() => {
  //     const result = await readUserSession();
  //     const { data, error } = result;
  //     if (!data.session) {
  //       router.push("/pages/login")
  //     } 
  //   }
    
  //   checkUser()
  // }, [])
  

  return (
    <div>
      {children}
    </div>
  )
}

export default ApplicantOnlyPage