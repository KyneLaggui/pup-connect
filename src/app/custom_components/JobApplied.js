import Image from "next/image";
import { PUPLogo } from "@assets/index";
import { jobCardInfo } from "../constants";
import { JobCardSmall } from "./JobCard";

const JobApplied = () => {
  return (
    <div className="flex-1 h-fit rounded-xl p-8 border shadow-md bg-background">
      <h1 className="mb-2 text-lg font-semibold">Applied Jobs</h1>

      {/* Job card */}
      {jobCardInfo.map((job, index) => (
        <JobCardSmall
          key={index}
          title={job.title}
          image={job.image}
          company={job.company}
          location={job.location}
        />
      ))}
    </div>
  );
};

export default JobApplied;
