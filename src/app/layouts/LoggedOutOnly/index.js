import React from 'react'
import { useRouter } from 'next/navigation'

const LoggedOutOnly = async ({ children }) => {
  const router = useRouter()
 
  const { data: { session }} = await supabase.auth.getSession();

  if (session) {
    router.push("/")
  }
  
  // useEffect(() => {
  //   const checkUser = async() => {
  //     const result = await readUserSession();
  //     const { data, error } = result
  //     if (data.session) {
  //       console.log(data.session)
  //       router.push("/")
  //     } 
  //   }
    
  //   checkUser()
  // }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default LoggedOutOnly