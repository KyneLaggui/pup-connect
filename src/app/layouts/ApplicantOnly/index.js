"use server"

import React from 'react'
import { readUserSession } from '@/supabase/actions'
import { redirect } from 'next/navigation'

const ApplicantOnly = async ({ children }) => {
    const { data } = await readUserSession()
    console.log(data)
    if (!data.session) {
        return redirect("/pages/login")
    }

  return (
    <div>{children}</div>
  )
}

export default ApplicantOnly