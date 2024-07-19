"use client";

import { TableCell } from "@/app/custom_components/TableCell";
import ViewApplication from "@/app/custom_components/applicants/ViewApplication";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Check, XIcon } from "lucide-react";
import Swal from "sweetalert2"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  applicationDate: string;
  companyEmail: string;
  jobId: number;
  applicationId: number;
  updateUI: () => void;
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
    accessorKey: "firstName",
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
      let middleInitial = row.original.middleName
        ? row.original.middleName.charAt(0) + "."
        : "";

      return (
        <TableCell>
          {row.original.firstName} {middleInitial} {row.original.lastName}
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
      return <TableCell>{row.original.applicationDate}</TableCell>;
    },
  },
  {
    accessorKey: "decision",
    header: "Decision",
    cell: ({ row }) => {
      const user = row.original;      
      const acceptApplicant = async() => {
        Swal.fire({
          title: "Confirmation",
          text: "Do you want to approve this application?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, accept it!"
        }).then(async(result) => {
          if (result.isConfirmed) {
            const confirmationResult = await supabase
            .from('employee')
            .insert({
              applicant_email: user.email,
              company_email: user.companyEmail,
              job_id: user.jobId
            })

            const applicationDeletionResult = await supabase
            .from('job_application')
            .delete()
            .eq('id', user.applicationId)

            user.updateUI(user.applicationId)
            
            if (!confirmationResult.error && !applicationDeletionResult.error) {
              Swal.fire({
                title: "Confirmed!",
                text: "The applicant has been accepted.",
                icon: "success"
              });
            }
          }
        });
      }

      return (
        <div className="flex gap-2">
          <Button variant="default" size="icon-sm" className="ml-2" onClick={acceptApplicant}>
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
