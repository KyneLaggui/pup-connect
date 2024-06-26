import { companyTable } from "@/app/constants";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import VerificationCheck from "@/layouts/VerificationCheck";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return companyTable;
}

export default async function CompaniesPage() {
  const data = await getData();

  return (
    <VerificationCheck>
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
    </VerificationCheck>

  );
}
