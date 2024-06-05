'use client';
import { useEffect } from 'react'
import { selectEmail, selectRole } from '@/redux/slice/authSlice'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'


const ApplicantOnlyPage = ({ children }) => {
  const router = useRouter()  
  const userEmail = useSelector(selectEmail)
  const userRole = useSelector(selectRole)
  
  useEffect(() => {
    if ((userRole === "applicant" || userRole === "admin" || userRole === "super admin") && !userEmail)  {
      router.push("/");
    }
  }, [userRole, userEmail])

  return (
    <div>
      {children}
    </div>
  )
}

export default ApplicantOnlyPage