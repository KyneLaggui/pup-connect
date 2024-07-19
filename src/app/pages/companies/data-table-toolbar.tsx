"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { statuses } from "./data";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { signUpWithEmailAndPasswordOnly } from "@/utils/supabase/actions";
import { Alert } from "@/app/custom_components/Alert";
import { useSelector } from "react-redux";
import { selectRole } from "@/redux/slice/authSlice";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  allData: TData[];
}

export function DataTableToolbar<TData>({
  table,
  allData
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableState, setTableState] = useState(null)
  const [role, setRole] = useState(null)
  const userRole = useSelector(selectRole)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "company",
  });

  // Form methods
  const onInputHandleChange = (e, name) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    } 
  };

  const isValidEmail= (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const downloadCSV = () => {
        // Step 1: Convert objects to CSV format
    const csvRows = [];
    const headers = Object.keys(tableState[0]);
    csvRows.push(headers.join(','));

    for (const obj of tableState) {
        const values = headers.map(header => JSON.stringify(obj[header], replacer));
        csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');

    // Step 2: Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Step 3: Create a link element, set its href to the Blob URL, and trigger a download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `companies.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function replacer(key, value) {
    // Handle null values
    return value === null ? '' : value;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log(formData)
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
      Alert(
        "error",
        "An error has occured",
        "Company registration failed!"
      );
    } else {
      Alert("success", "Registration successful", "Please check the designated email for the confirmation.");
    }
  };

  useEffect(() => {
    if (userRole) {
      setRole(userRole)
    }
  }, [userRole])

  useEffect(() => {
    if (allData) {
      setTableState(allData)
    }
  }, [allData])

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center gap-2 w-full">
        <Input
          placeholder="Search for company..."
          value={
            (table.getColumn("company_name")?.getFilterValue() as string) ?? ""
          }
          onInputHandleChange={(event) =>
            table.getColumn("company_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
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
        {
          role === 'admin' && (
            <Button variant="default" size="sm" className="ml-auto" onClick={toggleModal}>
            <div className="flex items-center gap-2">
              Add company
              <Plus className="h-4 w-4" />
            </div>
          </Button>
          )
        }
        <Button variant="green" size="sm" className="ml-auto" onClick={downloadCSV}>
          <div className="flex items-center gap-2">
            Export data to CSV
            <Plus className="h-4 w-4" />
          </div>
        </Button>
      </div>
      {/* <DataTableViewOptions table={table} /> */}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-[20px]">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
            <h2 className="text-xl font-bold mb-4">Add Company</h2>
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
