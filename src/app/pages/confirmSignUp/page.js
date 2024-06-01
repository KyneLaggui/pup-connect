import React from 'react'
import FormUser from '../../custom_components/FormUser'
import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'

const Page = async () => {
  return (
    <ApplicantOnlyPage>
      <div className='mt-20'>
        <FormUser />
      </div>
    </ApplicantOnlyPage>
  )
}

export default Page
