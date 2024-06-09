import { supabase } from '@/supabase/client'

const fetchUserEmail = async() => {
    const { data: { session } } = await supabase.auth.getSession();
 
    return session.user.email
}

export default fetchUserEmail



