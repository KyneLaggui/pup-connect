"use client"

import React from 'react'
import { readUserSession } from '@/supabase/actions'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { retrieveUser } from '../../../supabase/actions'

export const LoggedInOnlyComponent = ({ children }) => {
  const [hasUser, setHasUser] = useState(false)

  useEffect(() => {
    const checkUser = async() => {
      const result = await readUserSession();
      const { data, error } = result;

      if (data.session) {
        setHasUser(true)
      } 
    }
    
    checkUser()
  }, [])

  return (  
    <>  
        {hasUser && children}
    </>
  )
}

export const LoggedOutOnlyComponent = ({ children }) => {
  const [hasUser, setHasUser] = useState(false)

  useEffect(() => {
    const checkUser = async() => {
      const result = await readUserSession();
      const { data, error } = result;

      if (data.session) {
        setHasUser(true)
      } 
    }
    
    checkUser()
  }, [])

  return (  
    <>  
        {!hasUser && children}
    </>
  )
}
