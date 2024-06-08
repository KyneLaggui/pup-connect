'use client'
import { supabase } from '@/supabase/client'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, SET_USER_ROLE, SET_SETUP_FINISHED } from '@/redux/slice/authSlice';
import FetchUserProfile from '@/customHooks/fetchUserProfile';

const PageLayout = ({children}) => {
    
    const dispatch = useDispatch();

    const [id, setId] = useState(null)

    const { userData, isLoading } = FetchUserProfile(id)
    
    // Synchs the supabase login session with the redux store
    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log(session);
            if (session) {
                setId(session.user.id)
                dispatch(
                    SET_ACTIVE_USER({
                        email: session.user.email,
                        userId: session.user.id,                 
                    })
                );
                if (userData) {
                    dispatch(
                        SET_USER_ROLE({
                            role: userData.role,
                        })
                    )               
                    dispatch(
                        SET_SETUP_FINISHED({
                            setupFinished: userData.setup_finished
                        })
                    )     
                }   
                                             
            } else {
                dispatch(REMOVE_ACTIVE_USER());
                setId(null)
            }
          })
    }, [dispatch, id, userData])

    return (
        <div className={`page`}>
            {children}
        </div>
    );
}

export default PageLayout;