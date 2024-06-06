import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

import { indivUser } from "@/app/constants";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return indivUser;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
