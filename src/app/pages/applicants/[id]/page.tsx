import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

import { accountsTable, jobTableV2, applicantsTable } from "@/app/constants";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return applicantsTable;
}

export default async function ApplicantsPage({ params }) {
  const data = await getData();

  const job_id = params.id;
  const jobs = jobTableV2;

  // Find the job with matching job_id
  const job = jobs.find((job) => job.id === job_id);

  return (
    <div className="flex">
      <div className="container-sidebar">
        <h1 className="text-2xl font-semibold tracking-tight">
          Applicants for {job.job_title}
        </h1>
        <p className="text-md font-medium text-muted-foreground mb-4">
          This is the list of applicants for the job.
        </p>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
