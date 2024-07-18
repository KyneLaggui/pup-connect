import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';

const FetchApplicantProfileId = (id) => {
    const [user, setUser] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getProfile = async() => {

            if (id) {
                let userData = await supabase.from("applicant")
                .select("*")
                .eq('id', id)
                .single();                   
                setUser(userData['data']);
            }            
            setIsLoadingProfile(false)
        }

        getProfile();
    }, [])

    return {userData: user, isLoadingProfile}
}

export default FetchApplicantProfileId