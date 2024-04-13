import JobCard from "@/app/custom_components/JobCard";
import React from "react";
import { jobCardInfo } from '../../constants'
import NavBar from "@/app/custom_components/NavBar"
import FilterJob from "@/app/custom_components/FilterJob";
import Footer from "@/app/custom_components/Footer";
import { AccordionProgress } from "@/app/custom_components/AccordionProgress";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { Navigation, Share2 } from "lucide-react";
import Image from 'next/image'



const Explore = () => {
  return (
    <>
      <div className="flex justify-between items-center flex-col h-screen "> 
        <NavBar />
        
        <div className="mt-20 container flex justify-center">
          <FilterJob />
          <div className="flex justify-start items-center flex-wrap gap-4 py-5 pl-5">
            
            <AccordionProgress />
            {jobCardInfo.map((job)=> (
              <Drawer>
                <DrawerTrigger >
                <JobCard key={job.number} {...job}/>
                </DrawerTrigger>

                <DrawerContent>
                  <div className="flex justify-between p-12">
                    <div className="flex flex-col justify-center items-start gap-5">

                      <div className="flex justify-between items-center lg:min-w-[940px] w-full">
                        <h1 className="text-4xl font-semibold text-foreground">{job.title}</h1>
                        <div className="flex items-center gap-2">
                          <Button className='px-10 py-3 text-sm font-medium'>Contact Us</Button>
                          <div className="border border-buttonBorder p-3 rounded-md"> 
                            <Share2 className="text-buttonBorder" size={17} />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row gap-3">   
                          {job.tags.map((tag, index) => (
                            <div key={index} className="px-4 py-2 rounded-md bg-primary-foreground border border-tag">
                              <p className="text-sm font-medium text-secondary-foreground">{tag}</p>
                            </div>
                          ))}
                      </div>

                      <div className="flex items-center gap-5">
                        <Image
                        src={job.image} 
                        className="rounded-sm"
                        width={100}
                        height={100}
                        />
                        <div className="flex flex-col gap-1">
                          <h1 className="text-xl font-semibold text-foreground">{job.company}</h1>
                          <div className="flex items-center gap-1">
                            <Navigation fill size={12} className="text-drawer-icon" />
                            <p className="text-sm text-drawer-icon font-normal">{job.location}</p>                            
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 lg:max-w-[740px] ">
                          <h1 className="text-lg font-medium text-foreground">About this Role</h1>
                          <p className="text-sm leading-5 text-drawer-icon">{job.about}</p>
                      </div>

                      <div className="flex flex-col gap-3 lg:max-w-[740px] ">
                          <h1 className="text-lg font-medium text-foreground">Qualification</h1>
                          <ul className="list-disc text-drawer-icon pl-6">
                            {job.qualifications.map((quali, index)=> (
                              <li key={index} className="text-sm leading-5 text-drawer-icon">
                                  {quali}
                              </li>
                            )) }
                          </ul>
                      </div>

                      <div className="flex flex-col gap-3 lg:max-w-[740px] ">
                          <h1 className="text-lg font-medium text-foreground">Benefits</h1>
                          <ul className="list-disc text-drawer-icon pl-6">
                            {job.benefits.map((quali, index)=> (
                              <li key={index} className="text-sm leading-5 text-drawer-icon">
                                  {quali}
                              </li>
                            )) }
                          </ul>
                      </div>

                      
                    </div>
                    <div>
                      <h1>Similar Jobs</h1>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
          
          
        </div>
        <Footer />
      </div>
      
    </>
    
  )
};

export default Explore;
