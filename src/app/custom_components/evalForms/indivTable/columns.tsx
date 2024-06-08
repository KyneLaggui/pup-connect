"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
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
        <p
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
    cell: ({ row }) => {
      return <p className="tracking-wide">{row.original.name}</p>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer hover:text-red-500"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <span className="tracking-wide">{formattedDate}</span>;
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
