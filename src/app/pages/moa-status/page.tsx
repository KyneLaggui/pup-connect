"use client";
// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Custom component
import Sidebar from "@/app/custom_components/Sidebar";

// Data Table
import { User, columns } from "./columns";
import { DataTable } from "./data-table";

import moaStatusJSON from "@/app/pages/moa-status/moa-status.json";

// Wrapper
import ApplicantOnlyPage from "@/app/layouts/ApplicantOnlyPage";
import VerificationCheck from "@/app/layouts/VerificationCheck";
import { useEffect, useState } from "react";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return moaStatusJSON;
}

export default function DemoPage() {
  const [dataState, setDataState] = useState([]);

  // const data = getData();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setDataState(result);
    };

    fetchData();
  }, []);

  return (
    <ApplicantOnlyPage>
      {/* <VerificationCheck> */}
      <div className="flex">
        <div className="w-full flex justify-center container-sidebar">
          <h1 className="text-2xl font-semibold tracking-tight">MOA Status</h1>
          <p className="text-md font-medium text-muted-foreground mb-4">
            This is the list of MOA that has been processed and being processed.
          </p>
          <DataTable columns={columns} data={dataState} />
        </div>
      </div>
      {/* </VerificationCheck> */}
    </ApplicantOnlyPage>
  );
}
