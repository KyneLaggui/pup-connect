import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'

const ApplicantOnlyPage = async ({ children }) => {
  const supabase = createClient();
  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    console.log(session)
    redirect("/")
  } 

  return (
    <div>
      {children}
    </div>
  )
}

export default ApplicantOnlyPage