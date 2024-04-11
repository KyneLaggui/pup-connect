import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>Tickets
      <Image
        src="/logo.jpg"
        alt=""
        height="100"
        width="400"
      >      
      </Image>
    </div>
    
  )
}

export default page