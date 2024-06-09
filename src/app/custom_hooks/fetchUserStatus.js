import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client';

const FetchUserStatus = () => {
    const [user, setUser] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getProfile = async() => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                let userData = await supabase.from("profile")
                .select("setup_finished")
                .eq('email', session.user.email)
                .single();       
                
                setUser(userData['data']);
            }            
            setIsLoadingProfile(false)
        }

        getProfile();
    }, [])

    return {userStatus: user, isLoadingProfile}
}

export default FetchUserStatus