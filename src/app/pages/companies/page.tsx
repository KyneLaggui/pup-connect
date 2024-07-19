"use client"
import { useState, useEffect } from 'react'
import { companyTable } from "@/app/constants";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import VerificationCheck from "@/layouts/VerificationCheck";
import { supabase } from '@/utils/supabase/client';
import AdminFacultyOnlyPage from '@/app/layouts/AdminFacultyOnlyPage';
// {
//   id: 1,
//   status: "Approved",
//   company_name: "Kamba",
//   email: "kbaldery0@geocities.jp",
//   no_of_employees: 17,
//   date: "2023-10-29T22:19:35Z",
// },

export default function CompaniesPage() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    async function getData(): Promise<Payment[]> {
      // Fetch data from your API here.
      const allCompany = await supabase 
        .from('company')
        .select('*')

      let gatheredData = [];
      if (allCompany.data) {
        const companyDetails = await Promise.all(
          (allCompany.data).map(async (company) => {
              const date = new Date(company.created_at);
              // Define options for formatting the date
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              // Format the date
              const formattedDate = date.toLocaleDateString('en-US', options);
              const randomEmployeeNumber =  Math.floor(Math.random() * (30 - 10 + 1)) + 10;

              gatheredData = [
                ...gatheredData,
                {
                  id: company.id,
                  company_name: company.name,
                  email: company.email,
                  no_of_employees: randomEmployeeNumber,
                  date: formattedDate,
                }
              ]  
            })
            )      
          }

        setData(gatheredData)
        }
        
      getData()
    }, [])

  return (
    <VerificationCheck>
      <AdminFacultyOnlyPage>
      <div className="flex">
        <div className="container-sidebar">
          <h1 className="text-2xl font-semibold tracking-tight">Companies</h1>
          <p className="text-md font-medium text-muted-foreground mb-4">
            This is the list of companies that has been processed and being
            processed.
          </p>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      </AdminFacultyOnlyPage>      
    </VerificationCheck>

  );
}
