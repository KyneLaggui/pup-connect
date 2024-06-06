"use client"; // Add this directive to make it a client-side component

import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { indivUser } from "@/app/constants";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  // In this example, we return a constant.
  return indivUser;
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
