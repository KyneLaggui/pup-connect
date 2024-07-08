"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { roles } from "./data";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { signUpWithEmailAndPasswordOnly } from "@/utils/supabase/actions";
import FormsLabel from "@/app/custom_components/FormsLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "applicant",
  });

  // Form methods
  const onInputHandleChange = (e, name) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: e,
        });
    }
  };

  const isValidEmail= (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const result = await signUpWithEmailAndPasswordOnly(
      formData.email,
      formData.password,
      formData.role
    );

    if (formData.email === "" || formData.password === "") {
      console.log('Please fill out the email and password.')
    } else if (formData.password.length < 6) {
      console.log('Password should at least be 6 characters.')
    } else if (!isValidEmail(formData.email)) {
      console.log('Invalid email.')
    }

    const { error } = JSON.parse(result);

    if (error) {
      console.log('Failed to add account.')
    } else {
      console.log('Account successfully added!');
    }
  };

  useEffect(() => {
    console.log(formData)
  }, [formData])

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
        </Button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-[20px]">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
            <h2 className="text-xl font-bold mb-4">Add Account</h2>
            <form>          
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. johndoe@email.com"
                  name="email"
                  className="mt-2"
                  onInputHandleChange={onInputHandleChange}
                ></Input>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <Input
                  id="password"
                  type="text"
                  placeholder="********"
                  name="password"
                  className="mt-2"
                  onInputHandleChange={onInputHandleChange}
                ></Input>
              </div>
              <div className="mb-4">
                <FormsLabel text="Role" label="role" />
                <Select
                  id="role"
                  name="role"
                  onValueChange={(value) => {
                    onInputHandleChange(value, "role");
                  }}
                  defaultValue={formData["role"] || ""}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Please select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="admin">Admin</SelectItem> */}
                    <SelectItem value="applicant">Applicant</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button variant="tertiary" onClick={toggleModal}>
                  Cancel
                </Button>
                <Button variant="default" className="ml-2" onClick={handleSubmit}>
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
