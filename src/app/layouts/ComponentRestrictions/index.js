import React from 'react'
import { listenAuthState, readUserSession } from '@/supabase/actions'
import { createClient } from '@/supabase/server'

export const LoggedInOnlyComponent = async ({ children }) => {
  // const [hasUser, setHasUser] = useState(false)

  // useEffect(() => {
  //   const checkUser = async() => {
  //     const result = await readUserSession();
  //     const user = await retrieveUser();
  //     console.log(user)
  //     const { data, error } = result;
  //     // listenAuthState();
  //     if (data.session) {
  //       setHasUser(true)
  //     } 
  //   }
    
  //   checkUser()
  // }, [])

  const supabase = createClient();
  const { data: { session }} = await supabase.auth.getSession();
  
  if (!session) {
    return undefined
  }

  return (  
    <>  
        {children}
    </>
  )
}

export const LoggedOutOnlyComponent = async ({ children }) => {
  // const [hasUser, setHasUser] = useState(false)

  // useEffect(() => {
  //   const checkUser = async() => {
  //     const result = await readUserSession();
  //     const { data, error } = result;
  //     if (data.session) {
  //       setHasUser(true)
  //     } 
  //   }
    
  //   checkUser()
  
  // }, [])

  const supabase = createClient();
  const { data: { session }} = await supabase.auth.getSession();    
  console.log(session)

  if (session) {
    return null
  }

  return (  
    <>  
        {children}
    </>
  )
}
