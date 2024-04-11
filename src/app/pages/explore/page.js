import JobCard from "@/app/custom_components/JobCard";
import React from "react";
import { jobCardInfo } from '../../constants'

const Explore = () => {
  return (
    <> 
      <div>Explore Tab</div>
      
      {jobCardInfo.map((job)=> (
        <JobCard key={job.number} {...job}/>
      ))}
      
    </>
    
  )
};

export default Explore;
