"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Tag } from "@/app/custom_components/Tag";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  company_name: string;
  status: string;
  email: string;
  date: string;
};

const statusVariantMap = {
  Approved: "static-success",
  Pending: "static-warning",
  Cancelled: "static-destructive",
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "status",
    header: "Status",
    // cell: ({ row }) => {
    //   const user = row.original;

    //   return (
    //     <Tag
    //       variant={statusVariantMap[user.status] || "static"}
    //       size="sm"
    //       className={`cursor-default`}
    //     >
    //       {user.status}
    //     </Tag>
    //   );
    // },
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => {
      return (
        <Button
          className="flex items-center gap-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "action",
    // header: "Actions",
    header: ({ column }) => {
      return <p className="w-4">Action</p>;
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* Backend: Add necessary action buttons here
                  Also, add the necessary functions */}
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem>Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
