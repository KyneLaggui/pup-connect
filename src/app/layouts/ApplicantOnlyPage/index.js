import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { headers } from "next/headers"

const ApplicantOnlyPage = async ({ children }) => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const heads = headers();
  const pathname = heads.get('x-current-path');

  // const resultData = await supabase
  // .from('profile')
  // .select()
  // .eq('email', session.user.email)
  // .single()

  if (!session) {
    redirect("/")
  } 

  return (
    <div>
      {children}
    </div>
  )
}

export default ApplicantOnlyPage