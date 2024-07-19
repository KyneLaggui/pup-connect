"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";

import ViewModal from "./ViewModal";
import { TableCell } from "@/app/custom_components/TableCell";

import FormProfile from "../../FormProfile";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          ID
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.id}</TableCell>;
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer hover:text-red-500"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          First Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.firstName}</TableCell>;
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer hover:text-red-500"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Last Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.lastName}</TableCell>;
    },
  },
  {
    accessorKey: "job",
    header: "Job",
    cell: ({ row }) => {
      return <TableCell>{row.original.jobTitle}</TableCell>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <TableCell>{row.original.email}</TableCell>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const data = row.original;

      return <ViewModal data={data}/>;
    },
  },
];
