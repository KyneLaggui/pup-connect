import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';


const FetchUserAddress = (id) => {
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
            
                if (userData.data) {
                    let userAddress = await supabase.from("address")
                    .select("*")
                    .eq('email', userData.data.email)
                    .single();                   
                    setUserAddress(userAddress['data']);
                }            
                setIsLoadingProfile(false)
            }
        }

        getAddress();
    }, [])

    return {userAddress: userAddress, isLoadingProfile}
}

export default FetchUserAddress