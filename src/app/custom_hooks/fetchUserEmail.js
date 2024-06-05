import { supabase } from '@/supabase/client'

const fetchUserEmail = async() => {

    // const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // const resultData = await supabase
    // .from('profile')
    // .select()
    // .eq('email', session.user.email)
    // .single()
 
    return session.user.email
}

export default fetchUserEmail



