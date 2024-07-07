import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterJob = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    jobMode: "",
    jobType: "",
    others: "",
  });

  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  const isSelected = (category, value) => selectedFilters[category] === value;

  return (
    <div>
      <div className="flex sm:hidden bg-secondary py-8 px-5 sm:px-10 gap-3 flex-col">
        <Label htmlFor="search" className="text-sm font-medium text-foreground">
          Search Your Future Job
        </Label>
        <div className="flex gap-3">
          <Input
            type="text"
            id="search"
            placeholder="Search for a job..."
            className="bg-input border-input-border font-medium"
          />

          <Popover>
            <PopoverTrigger>
              <Button
                variant="default"
                size="default"
                className="sm:min-w-[140px]"
              >
                <FilterListIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Job Mode">
                    {["Remote", "On-site", "Hybrid"].map((mode) => (
                      <CommandItem
                        key={mode}
                        onSelect={() => handleSelect("jobMode", mode)}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected("jobMode", mode)
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        {mode}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Job Type">
                    {["Internship", "Part-time", "Full-time"].map((type) => (
                      <CommandItem
                        key={type}
                        onSelect={() => handleSelect("jobType", type)}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected("jobType", type)
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        {type}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Others">
                    <CommandItem
                      onSelect={() => handleSelect("others", "with Allowance")}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected("others", "with Allowance")
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      with Allowance
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup>
                    <Button className="w-full">Filter</Button>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="hidden sm:flex w-[15rem] py-5 px-5 flex-col justify-start items-start gap-4 border-r-[1.8px] border-muted ">
        {/* Start of Search  */}
        <div className="grid w-full max-w-sm items-center gap-[10px] border-b-[1.5px] border-muted pb-4">
          <Label
            htmlFor="search"
            className="text-sm font-medium text-foreground"
          >
            Search
          </Label>
          <Input
            type="text"
            id="search"
            placeholder="Search Company..."
            className="bg-input border-input-border font-medium"
          />
          <Button variant="default" size="default">
            Search
          </Button>
        </div>
        {/* End of Search */}

        {/* Start of Allowance Switch */}
        <div className="flex justify-between w-full items-center border-b-[1.5px] border-muted pb-4">
          <Label
            htmlFor="allowance-switch"
            className="text-foreground cursor-pointer"
          >
            With Allowance
          </Label>
          <Switch id="allowance-switch" />
        </div>
        {/* End of Allowance Switch */}

        {/* Start of Job Mode Checkbox */}
        <div className="flex flex-col justify-center items-start gap-2 border-b-[1.5px] border-muted pb-4 w-full">
          <Label
            htmlFor="job-type"
            className="text-sm font-medium text-foreground"
          >
            Job Mode
          </Label>
          <div className="flex justify-start items-center gap-2 pl-4">
            <Checkbox id="remote" />
            <label
              htmlFor="remote"
              className="text-checkbox-text text-sm font-normal cursor-pointer select-none"
            >
              Remote
            </label>
          </div>
          <div className="flex justify-start items-center gap-2 pl-4">
            <Checkbox id="on-site" />
            <label
              htmlFor="on-site"
              className="text-checkbox-text text-sm font-normal cursor-pointer select-none"
            >
              On-site
            </label>
          </div>
          <div className="flex justify-start items-center gap-2 pl-4">
            <Checkbox id="hybrid" />
            <label
              htmlFor="hybrid"
              className="text-checkbox-text text-sm font-normal cursor-pointer select-none"
            >
              Hybrid
            </label>
          </div>
        </div>
        {/* End of Job Mode Checkbox */}

        {/* Start of Job Type Checkbox */}
        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <Label
            htmlFor="job-type"
            className="text-sm font-medium text-foreground"
          >
            Job Type
          </Label>
          <div className="flex justify-start items-center gap-2 pl-4">
            <Checkbox id="internship" />
            <label
              htmlFor="internship"
              className="text-checkbox-text text-sm font-normal cursor-pointer select-none"
            >
              Internship
            </label>
          </div>
          <div className="flex justify-start items-center gap-2 pl-4">
            <Checkbox id="part-time" />
            <label
              htmlFor="part-time"
              className="text-checkbox-text text-sm font-normal cursor-pointer select-none"
            >
              Part-Time
            </label>
          </div>
          <div className="flex justify-start items-center gap-2 pl-4">
            <Checkbox id="full-time" />
            <label
              htmlFor="full-time"
              className="text-checkbox-text text-sm font-normal cursor-pointer select-none"
            >
              Full-Time
            </label>
          </div>
        </div>
        {/* End of Job Type Checkbox */}
      </div>
    </div>
  );
};

export default FilterJob;
