import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';

const FetchUserProfile = () => {
    const [user, setUser] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getProfile = async() => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                let userData = await supabase.from("profile")
                .select("*")
                .eq('email', session.user.email)
                .single();                   
                setUser(userData['data']);
            }            
            setIsLoadingProfile(false)
        }

        getProfile();
    }, [])

    return {userData: user, isLoadingProfile}
}

export default FetchUserProfile