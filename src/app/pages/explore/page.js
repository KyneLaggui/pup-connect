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
import { Share2 } from "lucide-react";



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
                  <div className="flex justify-between">
                    <div>
                      <div>
                        <h1 className="text-4xl font-semibold">Call Center Internship</h1>
                        <div className="flex items-center gap-2">
                          <Button className='px-10 py-3 text-sm font-medium'>Contact Us</Button>
                          <div className="border border-buttonBorder p-3 rounded-md"> 
                            <Share2 className="text-buttonBorder" size={17} />
                          </div>
                          
                        </div>
                        
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
