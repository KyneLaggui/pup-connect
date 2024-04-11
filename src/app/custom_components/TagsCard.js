import React from 'react'
import { filterMicrosoft } from '../constants'

const TagsCard = () => {
  return (
    <div className='flex gap-1'>
    {filterMicrosoft.map((microsoft) => (
        <div className='py-1 px-2 bg-blue-50 border border-blue-100 rounded-md whitespace-nowrap' key={microsoft.tags}>
          <p className='text-xs text-blue-900 font-medium'>{microsoft.name}</p>
        </div>
      ))}
    </div> 
    
  )
}

export default TagsCard
