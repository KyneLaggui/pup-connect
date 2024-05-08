"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { retrieveUser } from '@/supabase/actions'
import { readUserSession } from '../../../supabase/actions'

const LoggedOutOnly = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async() => {
      const result = await readUserSession();
      const { data, error } = result
      if (data.session) {
        console.log(data.session)
        router.push("/")
      } 
    }
    
    checkUser()
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default LoggedOutOnly