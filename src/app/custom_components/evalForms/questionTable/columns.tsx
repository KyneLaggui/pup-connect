"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  number: number;
  question: string;
  veryDissatisfied: string;
  dissatisfied: string;
  neutral: string;
  satisfied: string;
  verySatisfied: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "number",
    header: "#",
  },
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "veryDissatisfied",
    header: "Very Dissatisfied",
  },
  {
    accessorKey: "dissatisfied",
    header: "Dissatisfied",
  },
  {
    accessorKey: "neutral",
    header: "Neutral",
  },
  {
    accessorKey: "satisfied",
    header: "Satisfied",
  },
  {
    accessorKey: "verySatisfied",
    header: "Very Satisfied",
  },
];
