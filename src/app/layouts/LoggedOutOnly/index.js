"use server"

import React from 'react'
import { readUserSession } from '@/supabase/actions'
import { redirect } from 'next/navigation'

const LoggedOutOnly = async ({ children }) => {
    const { data } = await readUserSession()
    if (data.session) {
        return redirect("/pages/profile")
    }

  return (
    <div>{children}</div>
  )
}

export default LoggedOutOnly