import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const FilterJob = () => {
  return (
    <div className="max-w-[240px] w-full py-5 pr-5 flex flex-col justify-start items-start gap-4 border-r-[1.8px] border-muted ">
      {/* Start of Search  */}
      <div className="grid w-full max-w-sm items-center gap-[10px] border-b-[1.5px] border-muted pb-4">
        <Label htmlFor="search" className="text-sm font-medium text-foreground">
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
  );
};

export default FilterJob;
