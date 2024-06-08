"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ViewModal from "./ViewModal";

export type Payment = {
  id: string;
  name: string;
  date: string;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <p className="tracking-wide">{row.original.id}</p>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="tracking-wide">{row.original.name}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <p className="tracking-wide">{row.original.date}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <p className="tracking-wide">{row.original.email}</p>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return <ViewModal />;
    },
  },
];
