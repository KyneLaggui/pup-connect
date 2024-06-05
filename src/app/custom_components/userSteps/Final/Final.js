import { supabase } from "@/supabase/client";
import React, { useContext, useEffect } from "react";
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
        phone_number: userData.phone,
        social_links: userData.socialLinks,
        setup_finished: false
      })
      .eq('email', userData.email)

      if (error) {
        console.log(error)
      }

      const addressResult = await supabase
      .from('address')
      .update({
        region: userData.region.name,
        province: userData.province.name,
        'city/municipality': userData.cityOrMunicipality.name,
        barangay: userData.barangay.name,
        street_address: userData.streetAddress,
      })
      .eq('email', userData.email)

      console.log(addressResult)

      if (addressResult.error) {
        console.log(addressResult.error)
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
