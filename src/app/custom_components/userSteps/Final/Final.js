import React, { useContext, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { StepperContext } from "../../StepperContext";

const FinalComponent = () => {
  const { userData, setUserData } = useContext(StepperContext);

  useEffect(() => {
    const updateData = async() => {
      const { data, error } = await supabase
      .from('profile')
      .update({
        first_name: userData.firstName,
        middle_name: userData.middleName,
        last_name: userData.lastName,
        birth_date: userData.birthDate,
        gender: userData.gender,
        phone_number: userData.phoneNumber,
        social_links: userData.socialLinks,
        cover_letter: userData.coverLetter,
        additional_notes: userData.additionalNotes, 
        setup_finished: true
      })
      .eq('email', userData.email)

      if (error) {
        console.log(error)
      }

      const addressResult = await supabase
      .from('address')
      .update({
        region: userData.region,
        region_code: userData.regionCode,
        cityOrProvince: userData.cityOrProvince,
        street_address: userData.streetAddress,
      })
      .eq('email', userData.email)

      if (addressResult.error) {
        console.log(addressResult.error)
      }

      const resumeFileExt = (userData.resume.name).split('.').pop()
      const rawEmail = (userData.email).replace(/\.com$/, '')
      const resumeResult = await supabase
        .storage 
        .from('resume')
        .upload(`public/${rawEmail}.${resumeFileExt}`, userData.resume, {
          cacheControl: '3600',
          upsert: true
      })

      if (resumeResult.error) {
        console.log(resumeResult.error)
      } else {
        console.log(resumeResult.data)
      }

    }

    updateData();
  }, [])

  return (
    <div className="flex flex-col items-center text-center">
      <div>
        <h1 className="text-xl font-semibold text-primary mb-1">
          Registration Complete
        </h1>
        <p className="text-sm font-medium text-muted-foreground tracking-wide">
          Click the confirm button to proceed to sign in.
        </p>
      </div>
      <img
        className="w-1/2 h-1/2 mt-4"
        src="https://static.vecteezy.com/system/resources/previews/014/069/956/original/birthday-party-confetti-3d-illustration-png.png"
      />
    </div>
  );
};

export default FinalComponent;
