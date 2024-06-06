"use client"; // Add this directive to make it a client-side component

import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { indivUser } from "@/app/constants";

import { evalQuestions } from "@/app/constants";
import { Button } from "@/components/ui/button";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  // In this example, we return a constant.
  return evalQuestions;
}

export default function IndivTable() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="w-full flex items-center">
        <div className="flex items-center gap-1">
          <p className="text-sm text-muted-foreground">Total respondents:</p>
          <p className="text-sm font-medium">{evalQuestions.length}</p>
        </div>
        <Button className="mb-4 ml-auto">Export CSV</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
