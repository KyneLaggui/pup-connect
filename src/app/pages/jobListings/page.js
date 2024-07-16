"use client";
import { jobTableV2 } from "@/app/constants";
import { JobCardCompany } from "@/app/custom_components/JobCard";
import { Tag } from "@/app/custom_components/Tag";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Navigation, Share2, WalletMinimal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const jobs = jobTableV2;

  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatJobType = (jobType) => {
    switch (jobType) {
      case "full_time":
        return "Full Time";
      case "part_time":
        return "Part Time";
      case "internship":
        return "Internship";
      default:
        return jobType; // Return the original value if it doesn't match any case
    }
  };

  const formatJobMode = (jobMode) => {
    switch (jobMode) {
      case "remote":
        return "Remote";
      case "on_site":
        return "On Site";
      case "hybrid":
        return "Hybrid";
      default:
        return jobMode; // Return the original value if it doesn't match any case
    }
  };

  return (
    <div className="flex">
      <div className="container-sidebar">
        <h1 className="text-2xl font-semibold tracking-tight">Job Listings</h1>
        <p className="text-md font-medium text-muted-foreground mb-4">
          Here are the jobs listed by your company.
        </p>

        <Input
          type="text"
          value={searchTerm}
          onInputHandleChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search job"
          className="mb-5"
        />

        <div className="grid auto-fit-[300px] gap-4">
          {filteredJobs.map((job, index) => (
            <Drawer key={job.id}>
              <DrawerTrigger>
                <JobCardCompany key={job.id} {...job} />
              </DrawerTrigger>
              <DrawerContent className="lg:h-[95%] h-screen ">
                <div className="flex justify-evenly xl:p-14 p-12 items-start overflow-y-scroll ">
                  <div className="flex flex-col justify-start items-start gap-5 lg:min-w-[940px]">
                    <div className="flex justify-between items-center w-full ">
                      <h1 className="text-3xl font-semibold text-foreground">
                        {job.job_title}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Button>
                          <Link
                            key={job.id}
                            href={`/pages/applicants/${job.id}`} // Change this to the correct path
                            className="px-2"
                          >
                            Applicants
                          </Link>
                        </Button>
                        <div className="border border-buttonBorder p-3 rounded-md cursor-pointer">
                          <Share2 className="text-buttonBorder" size={17} />
                        </div>
                      </div>
                    </div>

                    {/* Removed <div> around <Tag> */}
                    <div className="flex flex-row gap-3">
                      {job.tags.map((tag, index) => (
                        <Tag key={index} className="capitalize">
                          {tag}
                        </Tag>
                      ))}
                    </div>

                    <div className="flex items-center gap-5">
                      <Image
                        src={job.image}
                        alt="Job Company"
                        className="rounded-sm"
                        width={100}
                        height={100}
                      />
                      <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-semibold text-foreground">
                          {job.company}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <AccessTimeIcon
                          size={14}
                          className="text-drawer-icon text-[20px]"
                        />
                        <p className="text-base text-drawer-icon font-base">
                          {formatJobType(job.job_type)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <SettingsOutlinedIcon
                          size={14}
                          className="text-drawer-icon text-[20px]"
                        />
                        <p className="text-base text-drawer-icon font-base">
                          {formatJobMode(job.job_mode)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation size={14} className="text-drawer-icon" />
                        <p className="text-base text-drawer-icon font-base">
                          {job.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <WalletMinimal size={14} className="text-drawer-icon" />
                        <p className="text-base text-drawer-icon font-base">
                          {job.salary}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:max-w-[740px] ">
                      <h1 className="text-lg font-medium text-foreground">
                        About this Role
                      </h1>
                      <p className="text-base leading-6 text-drawer-icon">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 lg:max-w-[740px] ">
                      <h1 className="text-lg font-medium text-foreground">
                        Qualification
                      </h1>
                      <ul className="list-disc text-drawer-icon pl-6">
                        {job.qualifications.map((quali, index) => (
                          <li
                            key={index}
                            className="text-base leading-6 text-drawer-icon"
                          >
                            {quali}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3 lg:max-w-[740px] ">
                      <h1 className="text-lg font-medium text-foreground">
                        Benefits
                      </h1>
                      <ul className="list-disc text-drawer-icon pl-6">
                        {job.benefits.map((quali, index) => (
                          <li
                            key={index}
                            className="text-base leading-6 text-drawer-icon"
                          >
                            {quali}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3 lg:max-w-[740px] ">
                      <h1 className="text-lg font-medium text-foreground">
                        Attachments
                      </h1>
                      <iframe
                        src="https://drive.google.com/file/d/1ZZcxn5ulphyXE7vL1yt5QpiuUXTew1_y/preview"
                        className="rounded-md"
                        width="150"
                        height="150"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            // <JobCardCompany
            //   key={index}
            //   title={job.job_title}
            //   date_created={job.date_created}
            //   no_of_applicant={job.no_of_applicant}
            // />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
