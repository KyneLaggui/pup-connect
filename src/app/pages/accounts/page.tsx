import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

import { accountsTable } from "@/app/constants";
import AdminOnlyPage from "@/layouts/AdminOnlyPage";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return accountsTable;
}

export default async function AccountsPage() {
  const data = await getData();

  return (
    <AdminOnlyPage>
      <div className="flex">
        <div className="container-sidebar">
          <h1 className="text-2xl font-semibold tracking-tight">Accounts</h1>
          <p className="text-md font-medium text-muted-foreground mb-4">
            This is the list of accounts that has been processed and being
            processed.
          </p>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </AdminOnlyPage>

  );
}
