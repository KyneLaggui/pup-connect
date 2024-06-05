"use client"
import { useRouter } from 'next/navigation'
import { supabase } from '@/supabase/client'
import { useEffect } from 'react'
import { selectEmail } from '@/redux/slice/authSlice'
import { useSelector } from 'react-redux'

const LoggedOutOnly = ({ children }) => {
  const router = useRouter()  
  const userEmail = useSelector(selectEmail)
  
  useEffect(() => {
    if (userEmail)  {
      router.push("/");
    }
  }, [userEmail])

  // useEffect(() => {
  //   const getSession = async() => {
  //     const { data: { user } } = await supabase.auth.getUser();

  //     if (user) {
  //       router.push("/");
  //     }
  //   }

  //   getSession();
  // }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default LoggedOutOnly