import JobCard from "@/app/custom_components/JobCard";
import React from "react";
import { jobCardInfo } from '../../constants'
import NavBar from "@/app/custom_components/NavBar"
import FilterJob from "@/app/custom_components/FilterJob";
import Footer from "@/app/custom_components/Footer";
import { AccordionProgress } from "@/app/custom_components/AccordionProgress";

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
              <JobCard key={job.number} {...job}/>
            ))}
          </div>
          
        </div>
        <Footer />
      </div>
      
    </>
    
  )
};

export default Explore;
