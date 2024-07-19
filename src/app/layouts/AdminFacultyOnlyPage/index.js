'use client';
import { useState, useEffect } from 'react'
import { selectRole } from '@/redux/slice/authSlice'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { supabase } from '@/utils/supabase/client';

const AdminFacultyOnlyPage = ({ children }) => {
  const router = useRouter()  
  const userRole = useSelector(selectRole)
  const [finishedLoading, setFinishedLoading] = useState(false);
  
  useEffect(() => {
    const getSession = async() => {
      const { data: { user }} = await supabase.auth.getUser()

      if (!user || (userRole && (userRole !== "admin" && userRole !== "faculty"))) {
        router.push("/")
      } else {
        setFinishedLoading(true)
      }
    }

    getSession()
  }, [userRole])

  return (
    finishedLoading ? (
        <div> 
            {children}
        </div>
    ) : (
        <div></div>
    )
  )
}

export default AdminFacultyOnlyPage;
