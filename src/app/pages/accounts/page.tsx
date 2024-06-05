// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Cusom components
import Sidebar from "@/app/custom_components/Sidebar";

// Icons
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "lucide-react";

// Data Table
import { Accounts, columns } from "./columns";
import { DataTable } from "./data-table";
import accountsJSON from "@/app/pages/accounts/accounts.json";

async function getData(): Promise<Accounts[]> {
  return accountsJSON;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      {/* <Sidebar /> */}
      <div className="flex">
        <div className="w-full flex flex-col justify-center container-sidebar">
          <div className="w-full mb-5 flex items-center">
            <div>
              <h1 className="text-2xl font-bold leading-1">Accounts</h1>
              <p className="text-sm text-gray-500">
                Manage your accounts here.
              </p>
            </div>
            <div className="relative ml-auto md:grow-0 border border-input-border rounded-lg">
              {/* <SearchIcon className="absolute left-[10px] top-2.5 h-5 w-5 text-muted-foreground" /> */}
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background md:w-[200px] lg:w-[336px]"
              />
            </div>
          </div>
          <Tabs defaultValue="all" className="mb-3">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
                <TabsTrigger value="user">User</TabsTrigger>
              </TabsList>

              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 gap-1">
                      <FilterListIcon className="h-3.5 w-3.5" />
                      <span className="hidden sm:flex sm:whitespace-nowrap">
                        Sort
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      ID
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Name</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Email</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Role</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="default">
                  <AddIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:flex sm:whitespace-nowrap">
                    Add account
                  </span>
                </Button>
              </div>
            </div>
          </Tabs>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
