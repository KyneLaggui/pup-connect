'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRole, selectSetupFinished } from '@/redux/slice/authSlice';

const VerificationCheck = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const userRole = useSelector(selectRole)
  const setupFinished = useSelector(selectSetupFinished)

  useEffect(() => {
    if (pathname !== "/pages/confirmSignUp" && userRole == "applicant" && !setupFinished)  {
      router.push("/pages/confirmSignUp");
    }
  }, [userRole, setupFinished, pathname])

  return (
    <div>
      {children}
    </div>
  )
}

export default VerificationCheck