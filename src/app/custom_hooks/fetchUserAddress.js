import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';


const FetchUserAddress = () => {
    const [userAddress, setUserAddress] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getAddress = async() => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                let userData = await supabase.from("address")
                .select("*")
                .eq('email', session.user.email)
                .single();                   
                setUserAddress(userData['data']);
            }            
            setIsLoadingProfile(false)
        }

        getAddress();
    }, [])

    return {userAddress: userAddress, isLoadingProfile}
}

export default FetchUserAddress