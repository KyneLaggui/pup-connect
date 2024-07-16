"use client";

import { TableCell } from "@/app/custom_components/TableCell";
import ViewApplication from "@/app/custom_components/applicants/ViewApplication";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Check, XIcon } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  role: string;
  application_date: string;
};

const formatDate = (date: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [month, day, year] = date.split("/");

  const monthName = months[parseInt(month) - 1];

  return `${monthName} ${parseInt(day)}, ${year}`;
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
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer hover:text-red-500"
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
      let middleInitial = row.original.middle_name
        ? row.original.middle_name.charAt(0) + "."
        : "";

      return (
        <TableCell>
          {row.original.first_name} {middleInitial} {row.original.last_name}
        </TableCell>
      );
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
    accessorKey: "application_date",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer hover:text-red-500"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Application Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
    cell: ({ row }) => {
      return <TableCell>{formatDate(row.original.application_date)}</TableCell>;
    },
  },
  {
    accessorKey: "decision",
    header: "Decision",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2">
          <Button variant="default" size="icon-sm" className="ml-2">
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon-sm" className="ml-2">
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;

      return <ViewApplication data={data} />;
    },
  },
];
