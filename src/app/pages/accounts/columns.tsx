"use client";

import { Tag } from "@/app/custom_components/Tag";
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
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Accounts = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  role: "admin" | "faculty" | "user";
};

const roleVariantMap = {
  admin: "static-destructive",
  faculty: "static-warning",
  user: "static-success",
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
    header: ({ column }) => {
      return (
        <Button
          className="flex items-center gap-2"
          variant="ghost"
          size="sm"
          icon={<ArrowUpDown />}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
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
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Tag
          variant={roleVariantMap[user.role] || "static"}
          size="sm"
          className={`cursor-default`}
        >
          {user.role}
        </Tag>
      );
    },
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
