import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';


const FetchApplicantAddress = (id) => {
    const [userAddress, setUserAddress] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getAddress = async() => {
            let userData = await supabase.from("applicant_address")
            .select("*")
            .eq('applicant_id', id)
            .single();                   

            if (userData.data) {
                setUserAddress(userData['data']);
                setIsLoadingProfile(false)
            }              
        }

        getAddress();
    }, [])

    return {userAddress: userAddress, isLoadingProfile}
}

export default FetchApplicantAddress