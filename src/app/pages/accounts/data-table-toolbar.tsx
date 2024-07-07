"use client";

import { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFiltered = table.getState().columnFilters.length > 0;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center gap-2 w-full">
        <Input
          placeholder="Search for first name..."
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
          }
          onInputHandleChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
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

        <Button variant="default" size="sm" className="ml-auto" onClick={toggleModal}>
          <div className="flex items-center gap-2">
            Add account
            <Plus className="h-4 w-4" />
          </div>
          <div className="text-red-400">
            OKAYY
          </div>
        </Button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Account</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <Input placeholder="Enter first name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <Input placeholder="Enter role" />
              </div>
              <div className="flex justify-end">
                <Button variant="tertiary" onClick={toggleModal}>
                  Cancel
                </Button>
                <Button variant="default" className="ml-2">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
