import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';

const FetchUserApplicantDetails = () => {
    const [user, setUser] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getProfile = async() => {
            const { data: { user } } = await supabase.auth.getUser()   
            let completeDetails = {}

            if (user) {
                let userData = await supabase.from("applicant")
                .select("*")
                .eq('id', user.id)
                .single();                   
                completeDetails = {...userData.data}

                if (userData.data) {
                    let userAddress = await supabase.from("applicant_address")
                    .select("region, cityOrProvince, street_address, region_code")
                    .eq('applicant_id', user.id)
                    .single();   
                    console.log()
                    completeDetails = {...userData.data, ...userAddress.data}
                    setUser(completeDetails)
                }
            }            
            
            setIsLoadingProfile(false)
        }

        getProfile();
    }, [])

    return {userData: user, isLoadingProfile}
}

export default FetchUserApplicantDetails