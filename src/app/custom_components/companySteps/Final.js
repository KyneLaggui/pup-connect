import React, { useContext, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { CompanyContext } from "../StepperContext";

const FinalComponent = () => {
  const { companyData, setCompanyData } = useContext(CompanyContext);

  useEffect(() => {
    const updateData = async () => {
      try {
        const updateResult = await supabase
          .from('profile')
          .update({
            setup_finished: true,
          })
          .eq('email', companyData.email);

        const { data, error } = await supabase
          .from('company')
          .insert({
            name: companyData.name,
            email: companyData.email,
            tags: companyData.tags,
            description: companyData.description,
            social_links: companyData.socialLinks,
          });

        if (error) {
          console.log(error);
        }

        const addressResult = await supabase
          .from('company_address')
          .insert({
            email: companyData.email,
            region: companyData.region,
            region_code: companyData.regionCode,
            cityOrProvince: companyData.cityOrProvince,
            street_address: companyData.streetAddress,
          });

        if (addressResult.error) {
          console.log(addressResult.error);
        }

        const resumeFileExt = companyData.logo.name.split('.').pop();

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const logoResult = await supabase
            .storage
            .from('companyLogo')
            .upload(`public/${user.id}.${resumeFileExt}`, companyData.logo, {
              cacheControl: '3600',
              upsert: true,
            });

          if (logoResult.error) {
            console.log(logoResult.error);
          } else {
            console.log(logoResult.data);
          }
        }

        const updatedPasswordResult = await supabase.auth
          .updateUser({ password: companyData.password });

        console.log(updatedPasswordResult);
      } catch (error) {
        console.log('Error in updateData:', error);
      }
    };

    updateData();
  }, []); // Ensure the dependency array is empty to run only once

  return (
    <div className="flex flex-col items-center text-center">
      <div>
        <h1 className="text-xl font-semibold text-primary mb-1">
          Company Creation Complete
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
