"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Accounts = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  role: "admin" | "faculty" | "user";
  action: string;
};

export const columns: ColumnDef<Accounts>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "middle_name",
    header: "Middle Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];
