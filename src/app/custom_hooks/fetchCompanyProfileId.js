import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';

const FetchCompanyProfileId = (id) => {
    const [user, setUser] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        
        const getProfile = async() => {

            if (id) {
                let userData = await supabase.from("profile")
                .select("*")
                .eq('id', id)
                .single();
                
                if (userData.data) {
                    let companyData = await supabase.from("company")
                    .select("*")
                    .eq("email", userData.data.email)
                    .single()
                    setUser(companyData['data'])
                }
            }            
            setIsLoadingProfile(false)
        }

        getProfile();
    }, [id])

    return {userData: user, isLoadingProfile}
}

export default FetchCompanyProfileId