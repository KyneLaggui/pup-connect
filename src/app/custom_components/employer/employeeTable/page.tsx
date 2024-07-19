"use client"; // Add this directive to make it a client-side component

import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

import { employeeTable } from "@/app/constants";
import { useSelector } from "react-redux";
import { selectEmail } from "@/redux/slice/authSlice";
import { supabase } from "@/utils/supabase/client";

// {
//   id: 1,
//   first_name: "Blanche",
//   last_name: "Branscombe",
//   job: "Dental Hygienist",
//   email: "bbranscombe0@bbb.org",
// },

export default function EmployeeTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = useSelector(selectEmail);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  useEffect(() => {
    const fetchEmployeesDetail = async() => {
      if (userEmail) {
        const fetchEmployees = await supabase
          .from('employee')
          .select('*')
          .eq('company_email', userEmail)
        
        if (fetchEmployees.data) {
          const employees = await Promise.all(
            (fetchEmployees.data).map(async(employee) => {
              const jobDetail = await supabase
                .from('job')
                .select('title, email')
                .eq('id', employee.job_id)
                .single()

                const applicantDetails = await supabase
                .from('applicant')
                .select('*')
                .eq('email', employee.applicant_email)
                .single();

                if (applicantDetails.data) {
                  const applicantData = applicantDetails.data;

                  const applicantAddress = await supabase
                  .from('applicant_address')
                  .select('*')
                  .eq('email', employee.applicant_email) 
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
                      birthDate: applicantData.birth_date,
                      gender: capitalizeFirstLetter(applicantData.gender),
                      phoneNumber: applicantData.phone_number,
                      socialLinks: applicantData.social_links,
                      coverLetter: applicantData.cover_letter,
                      additionalNotes: applicantData.additional_notes,
                      resume: resumeResult.data.publicUrl, 
                      region: applicantAddressData.region,
                      cityOrProvince: applicantAddressData.cityOrProvince,
                      streetAddress: applicantAddressData.street_address,
                      jobTitle: jobDetail.data.title
                    }
                  }                              
                }
            })
          )

          setData(employees)
          setLoading(false)
        }
      }
    }
    
    fetchEmployeesDetail()
  }, [userEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
