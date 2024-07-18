"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { roles } from "./data";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center gap-2 w-full">
        <Input
          placeholder="Search for first name..."
          value={
            (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
          }
          onInputHandleChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
          />
        )}

        {isFiltered && (
          <Button
            variant="tertiary"
            onClick={() => table.resetColumnFilters()}
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            <p>Reset</p>
          </Button>
        )}

        {/* <Button variant="default" size="sm" className="ml-auto">
          <div className="flex items-center gap-2">
            Add user
            <Plus className="h-4 w-4" />
          </div>
        </Button> */}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
