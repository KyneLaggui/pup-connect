import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';


const FetchCompanyAddressId = (id) => {
    const [userAddress, setUserAddress] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getAddress = async() => {
            if (id) {
                let userData = await supabase.from("profile")
                    .select("*")
                    .eq('id', id)
                    .single()
                    console.log(userData)
                if (userData.data) {
                    let userAddress = await supabase.from("company_address")
                    .select("*")
                    .eq('email', userData.data.email)
                    .single();                   
                    setUserAddress(userAddress['data']);
                }            
                setIsLoadingProfile(false)
            }
        }

        getAddress();
    }, [id])

    return {userAddress: userAddress, isLoadingProfile}
}

export default FetchCompanyAddressId