"use client"

import React from "react";
import ApplicantOnlyPage from "@/app/layouts/ApplicantOnlyPage";
import { useState, useEffect } from 'react'
import FormProfileCompany from "../../../custom_components/FormProfileCompany";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { selectRole } from "@/redux/slice/authSlice";
import { useSelector } from "react-redux";
import VerificationCheck from "@/app/layouts/VerificationCheck";

const CompanyProfile = () => {
  const { id } = useParams()
  const [isViewable, setIsViewable] = useState(false);
  const userRole = useSelector(selectRole)
  const router = useRouter()

  useEffect(() => {
    // Checking if the user that is viewing the profile is the user itself or an admin
    const getUserId = async() => {
      const { data: { session } } = await supabase.auth.getSession();

      if ((session && session.user.id === id) || userRole === "admin" || userRole === "company" ) {
        setIsViewable(true)
      } else {
        console.log('redirect to home')
        // router.push('/')
      }           
  }
  getUserId();
  }, [id, userRole])

  return (
      <VerificationCheck>
        {
          isViewable ? (
            <div className="flex">
            <div className="w-full flex justify-center container-sidebar">
              <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
              <p className="text-md font-medium text-muted-foreground mb-4">
                View and edit your credentials here.
              </p>
  
              <div className="flex gap-4">
                <FormProfileCompany id={id} />
              </div>
            </div>
          </div> 
          ) : (
            <>
            </>
          )
        }
      </VerificationCheck>
  );
};

export default CompanyProfile;
