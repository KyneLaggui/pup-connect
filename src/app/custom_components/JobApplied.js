"use client"
import Image from "next/image";
import { PUPLogo } from "@assets/index";
import { JobCardSmall } from "./JobCard";
import { supabase } from "@/utils/supabase/client";
import { useSelector } from "react-redux";
import { selectEmail } from "@/redux/slice/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const JobApplied = () => {
  const [jobs, setJobs] = useState([])
  const userEmail = useSelector(selectEmail)
  const router = useRouter()

  useEffect(() => {
    if (userEmail) {
      const fetchingJobs = async() => {
        const fetchingQualifiedJobs = await supabase
        .from('employee')
        .select('*')
        .eq('applicant_email', userEmail)

        if (fetchingQualifiedJobs.data) {
          const allJobDetails = await Promise.all(
            (fetchingQualifiedJobs.data).map(async(qualifiedJob) => {
              const jobDetail = await supabase
                .from('job')
                .select('*')
                .eq('id', qualifiedJob.job_id)
                .single()

              const companyDetail = await supabase
                .from('company')
                .select('*')
                .eq('email', jobDetail.data.email)
                .single()     
              
                const companyAddress = await supabase
                .from('company_address')
                .select('region, cityOrProvince, street_address')
                .eq('email', jobDetail.data.email)
                .single()

              const result = await supabase
              .storage
              .from('companyLogo')
              .getPublicUrl(`public/${companyDetail.data.id}.png`)
              
              if (result.data){
                return {
                  title: jobDetail.data.title,
                  image: result.data.publicUrl,
                  company: companyDetail.data.name,
                  location: `${companyAddress.data.street_address}, ${companyAddress.data.cityOrProvince}, ${companyAddress.data.region}`,
                  id: qualifiedJob.id
                }
              }          
            })
          )

          setJobs(allJobDetails)
        }
      }

      fetchingJobs();
    }
  
  }, [userEmail])

  return (
    <div className="flex-1 h-fit rounded-xl p-8 border shadow-md bg-background">
      <h1 className="mb-2 text-lg font-semibold">Qualified Jobs</h1>

      {/* Job card */}
      {jobs.map((job, index) => (
        <JobCardSmall
          key={index}
          title={job.title}
          image={job.image}
          company={job.company}
          location={job.location}
          onClick={() => router.push(`/pages/evaluationForm/${job.id}`)}
        />
      ))}
    </div>
  );
};

export default JobApplied;
