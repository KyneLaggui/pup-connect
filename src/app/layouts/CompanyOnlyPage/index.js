'use client';
import { useEffect } from 'react'
import { selectRole } from '@/redux/slice/authSlice'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { supabase } from '@/utils/supabase/client';

const CompanyOnlyPage = ({ children }) => {
  const router = useRouter()  
  const userRole = useSelector(selectRole)
  
  useEffect(() => {
    const getSession = async() => {
      const { data: { user }} = await supabase.auth.getUser()

      if (!user || (userRole && (userRole !== "company"))) {
        router.push("/")
      }
    }

    getSession()
  }, [userRole])

  return (
    <div>
      {children}
    </div>
  )
}

export default CompanyOnlyPage;
