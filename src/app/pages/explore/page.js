import JobCard from "@/app/custom_components/JobCard";
import React from "react";
import { jobCardInfo } from "../../constants";
import NavBar from "@/app/custom_components/NavBar";
import FilterJob from "@/app/custom_components/FilterJob";
import Footer from "@/app/custom_components/Footer";
import { AccordionProgress } from "@/app/custom_components/AccordionProgress";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  AlarmClock,
  Cog,
  Navigation,
  Share2,
  Star,
  WalletMinimal,
} from "lucide-react";
import Image from "next/image";

const Explore = () => {
  return (
    <>
      <div className="flex justify-between items-center flex-col h-screen ">
        <NavBar />

        <div className="mt-20 container flex justify-between w-full">
          <FilterJob />
          <div className="flex flex-col gap-4 py-5 pl-5">
            <AccordionProgress />
            <div className="w-full flex justify-between flex-wrap gap-4">
              {jobCardInfo.map((job) => (
                <Drawer>
                  <DrawerTrigger>
                    <JobCard key={job.number} {...job} />
                  </DrawerTrigger>

                  <DrawerContent className="lg:h-[95%] h-screen ">
                    <div className="flex justify-evenly xl:p-14 p-12 items-start overflow-y-scroll ">
                      <div className="flex flex-col justify-center items-start gap-5 lg:min-w-[940px]">
                        <div className="flex justify-between items-center w-full ">
                          <h1 className="text-3xl font-semibold text-foreground">
                            {job.title}
                          </h1>
                          <div className="flex items-center gap-2">
                            <Button className="px-10 py-3 text-sm font-medium">
                              Apply
                            </Button>
                            <div className="border border-buttonBorder p-3 rounded-md">
                              <Share2 className="text-buttonBorder" size={17} />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row gap-3">
                          {job.tags.map((tag, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 rounded-md bg-primary-foreground border border-tag"
                            >
                              <p className="text-sm font-medium text-secondary-foreground">
                                {tag}
                              </p>
                            </div>
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
                            <div className="flex items-center gap-1">
                              <Star
                                fill="currentColor"
                                size={12}
                                className="text-yellow-300"
                              />
                              <p className="text-sm text-drawer-icon font-normal">
                                {job.ratings} | {job.reviews} reviews
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <AlarmClock
                              size={14}
                              className="text-drawer-icon"
                            />
                            <p className="text-base text-drawer-icon font-base">
                              {job.type}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Cog size={14} className="text-drawer-icon" />
                            <p className="text-base text-drawer-icon font-base">
                              {job.mode}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Navigation
                              size={14}
                              className="text-drawer-icon"
                            />
                            <p className="text-base text-drawer-icon font-base">
                              {job.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <WalletMinimal
                              size={14}
                              className="text-drawer-icon"
                            />
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
                            {job.about}
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

                      <div className="min-w-80 flex flex-col gap-5">
                        <div>
                          <h1 className="text-base font-medium mb-3">
                            Similar Jobs
                          </h1>
                          <div className="flex flex-col gap-2">
                            {jobCardInfo.slice(0, 3).map((similar) => (
                              <JobCard {...similar} />
                            ))}
                          </div>
                        </div>

                        <div>
                          <h1 className="text-base font-medium mb-3">
                            Other Jobs in {job.company}
                          </h1>
                          <div className="flex flex-col gap-2">
                            {jobCardInfo.map((jobInfo) => {
                              if (jobInfo.company === job.company) {
                                return (
                                  <JobCard key={jobInfo.number} {...jobInfo} />
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Explore;
