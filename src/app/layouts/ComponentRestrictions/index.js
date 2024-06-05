'use client'

import React from 'react'
import { supabase } from '@/supabase/client'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/redux/slice/authSlice'

export const LoggedInOnlyComponent = ({ children }) => {
  
  const user = useSelector(selectIsLoggedIn) 
  if (!user) {
    return undefined
  }

  return (  
    <>  
        {children}
    </>
  )
}

export const LoggedOutOnlyComponent = ({ children }) => {
  const user = useSelector(selectIsLoggedIn) 
  if (user) {
    return undefined
  }

  return (  
    <>  
        {children}
    </>
  )
}
