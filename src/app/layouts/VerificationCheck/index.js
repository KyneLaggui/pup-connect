'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRole } from '@/redux/slice/authSlice';
import FetchUserStatus from "@/app/custom_hooks/FetchUserStatus";

const VerificationCheck = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const userRole = useSelector(selectRole);
  const { userStatus } = FetchUserStatus();

  useEffect(() => {
    router.refresh();
    if (pathname !== "/pages/confirmSignUp" && userRole == "applicant" && userStatus && !userStatus.setup_finished) {
      router.push("/pages/confirmSignUp");
    }
  }, [userRole, userStatus, pathname]);

  return (
    <div>
      {children}
    </div>
  );
};

export default VerificationCheck;
