import Sidebar from "@/app/custom_components/Sidebar";

// Data Table
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

// Wrapper
import ApplicantOnlyPage from "@/app/layouts/ApplicantOnlyPage"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <ApplicantOnlyPage>
      <Sidebar />
      <div className="flex">
        <div className="w-full flex justify-center container-sidebar">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </ApplicantOnlyPage>
  );
}

