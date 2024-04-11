import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'


const JobCard = () => {
  return (
    <Card className="max-w-[296px] max-h-[160px] min-w-[240px] flex justify-start items-center flex-col p-5 border border-blue-100">
      <div className='flex flex-col justify-start items-center gap-3'>
        <div className='w-full flex items-center justify-start gap-2 flex-row'>
            <Image
                  src= '/assets/microsoft.jpg'
                  width={20}
                  height={20}
                  alt='Company Logo'
                  
              />
              <CardTitle className='text-base --obsidian-950 font-medium'>Microsoft Student Program</CardTitle>
          </div>
          <CardDescription className="text-xs max-h-[42px] truncate-lines font-normal ">
            Dive into the world of tech with Microsoft internships! Gain hands-on experience on real projects across various fields, from coding to design. 
            Explore programs designed for your experience level and learn from industry experts. Visit their Careers website to launch your journey!
          </CardDescription>
      </div>
        
    </Card>
  )
}

export default JobCard
