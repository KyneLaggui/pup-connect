"use client";
import { useState, useEffect } from 'react'
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { accountsTable, jobTableV2, applicantsTable } from "@/app/constants";
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function ApplicantsPage() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    id: "",
    email: ""
  })

  const [data, setData] = useState([])
  const { id } = useParams()

  
  const formatDate = (date_created) => {
    const date = new Date(date_created);
    // Define options for formatting the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const updateUI = (applicationId) => {
    setData(data.filter(application => application.applicationId !== applicationId))
  }

  useEffect(() => {
    if (id) {
      // Getting the specific job details
      const fetchJobDetails = async() => {
        const jobFetching = await supabase
        .from('job')
        .select('id, title, email')
        .eq('id', id)
        .single()
          
        if (jobFetching.data) {
          const jobFetchingData = jobFetching.data
          setJobDetails({
            title: jobFetchingData.title,
            id: jobFetchingData.id,
            email: jobFetchingData.email
          })

          // Getting the specific applicant details
          const fetchJobApplications = async() => {
            const applicantFetching = await supabase
            .from('job_application')
            .select('*')
            .eq('job_id', id)
              
            if (applicantFetching.data) {
              const applicants = await Promise.all(
                (applicantFetching.data).map(async(application) => {
                  const applicantDetails = await supabase
                  .from('applicant')
                  .select('*')
                  .eq('email', application.applicant_email)
                  .single();

                  if (applicantDetails.data) {
                    const applicantData = applicantDetails.data;

                    const applicantAddress = await supabase
                    .from('applicant_address')
                    .select('*')
                    .eq('email', application.applicant_email) 
                    .single()

                    const resumeResult = await supabase
                    .storage
                    .from('resume')
                    .getPublicUrl(`public/${applicantData.id}.pdf`)
                    
                    if (applicantAddress.data && resumeResult.data) {
                      const applicantAddressData = applicantAddress.data;

                      return {
                        id: applicantData.id,
                        firstName: applicantData.first_name,
                        middleName: applicantData.middle_name,
                        lastName: applicantData.last_name,              
                        email: applicantData.email,
                        companyEmail: jobFetchingData.email,
                        jobId: jobFetchingData.id,
                        birthDate: applicantData.birth_date,
                        applicationId: application.id, 
                        applicationDate: formatDate(application.created_at),
                        gender: capitalizeFirstLetter(applicantData.gender),
                        phoneNumber: applicantData.phone_number,
                        socialLinks: applicantData.social_links,
                        coverLetter: applicantData.cover_letter,
                        additionalNotes: applicantData.additional_notes,
                        resume: resumeResult.data.publicUrl, 
                        region: applicantAddressData.region,
                        cityOrProvince: applicantAddressData.cityOrProvince,
                        streetAddress: applicantAddressData.street_address,
                        updateUI: updateUI
                      }
                    }                              
                  }
                })
              )
              
              setData(applicants)
            }
          }

      fetchJobApplications();
      // End of getting the specific applicant details      
        }
      }

      fetchJobDetails();
      // End of getting the specific job details     
    }

  }, [id])

  return (
    <div className="flex">
      <div className="container-sidebar">
        <h1 className="text-2xl font-semibold tracking-tight">
          Applicants for {jobDetails.title}
        </h1>
        <p className="text-md font-medium text-muted-foreground mb-4">
          This is the list of applicants for the job.
        </p>
        <DataTable columns={columns} data={data} updateUI={updateUI}/>
      </div>
    </div>
  );
}
