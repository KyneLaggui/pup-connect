import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { headers } from "next/headers"

const VerificationCheck = async ({ children }) => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const heads = headers();
  const pathname = heads.get('x-current-path');

  if (session) {
    const resultData = await supabase
    .from('profile')
    .select()
    .eq('email', session.user.email)
    .single()
    
    console.log('okay', session)

    if (pathname !== "/pages/confirmSignUp" && resultData.data.role == "applicant" && !resultData.data.setup_finished)  {
      redirect("/pages/confirmSignUp");
    }
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default VerificationCheck