"use client"

import { supabase } from "@/utils/supabase/client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import AdminFacultyOnlyPage from "@/layouts/AdminFacultyOnlyPage";
import { useState, useEffect } from "react";

// {
//   id: 1,
//   first_name: "Violette",
//   middle_name: "Natalina",
//   last_name: "Dibling",
//   email: "ndibling0@simplemachines.org",
//   role: "user",
// },



export default function AccountsPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function getData(): Promise<Payment[]> {
      // Fetch data from your API here.
      const allProfile = await supabase 
        .from('profile')
        .select('*')
      
      let gatheredData = [];
      if (allProfile.data) {
        const profileDetails = await Promise.all(
          (allProfile.data).map(async (profile) => {
            const { data: applicantData, error: dataError } = await supabase
              .from("applicant")
              .select("*")
              .eq("email", profile.email)
              .single();
            
            if (applicantData) {
              gatheredData = [
                ...gatheredData,
                {
                  id: profile.id,
                  first_name: applicantData.first_name,
                  middle_name: applicantData.middle_name,
                  last_name: applicantData.last_name,
                  email: profile.email,
                  role: profile.role,
                }
              ]  
            } else {
              gatheredData = [
                ...gatheredData,
                {
                  id: profile.id,
                  first_name: "N/A",
                  middle_name: "N/A",
                  last_name: "N/A",
                  email: profile.email,
                  role: profile.role,
                }
              ]  
            }      
          }
        ))
        
        const filteredData = gatheredData.filter(data => data.role !== 'company')
        setData(filteredData)
      }
    }

    getData()
  }, [])

  return (
    <AdminFacultyOnlyPage>
      <div className="flex">
        <div className="container-sidebar">
          <h1 className="text-2xl font-semibold tracking-tight">Accounts</h1>
          <p className="text-md font-medium text-muted-foreground mb-4">
            This is the list of applicant accounts that has been processed and being
            processed.
          </p>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </AdminFacultyOnlyPage>

  );
}
