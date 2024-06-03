import React from 'react'
import FormUser from '../../custom_components/FormUser'
import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'
import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'

const Page = async () => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/")
  } 

  const result = await supabase
    .from('profile')
    .select('*')
    .eq('email', session.user.email)
    .single();
  
  return (
    <ApplicantOnlyPage>
      <div className='mt-20'>
        <FormUser email={result.data.email} firstName={result.data.first_name} lastName={result.data.last_name} />
      </div>
    </ApplicantOnlyPage>
  )
}

export default Page
