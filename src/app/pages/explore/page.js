"use client";

import JobCard from "@/app/custom_components/JobCard";
import React, { useEffect, useState } from "react";
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
import { Tag } from "@/app/custom_components/Tag";
import Link from "next/link";
import VerificationCheck from "@/app/layouts/VerificationCheck";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { selectRole } from '@/redux/slice/authSlice'
import { supabase } from "@/utils/supabase/client";
import { useSelector } from "react-redux";


const Explore = () => {   
  const [jobCardInfo, setJobCardInfo] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState("")

  const userRole = useSelector(selectRole)

  const capitalizeFirstLetter = (str) => {
    // Check if the string is empty
    if (str === '') return '';

    // Capitalize the first letter and concatenate with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);    
  }
  
  useEffect(() => {
    if (userRole) {
      setCurrentUserRole(userRole)
    }
  }, [])
   
  useEffect(() => {
    const fetchJobs = async() => {
      const jobFetching = await supabase
      .from('job')
      .select('*')

      if (jobFetching.data) {
        const jobsWithCompany = await Promise.all(
          (jobFetching.data).map(async (job) => {
            const { data: companyData, error: companyError } = await supabase
              .from("company")
              .select("*")
              .eq("email", job.email)
              .single();

            if (companyError) {
              throw companyError;
            } else {
              const { data: companyAddress, error: companyAddressError } = await supabase
              .from("company_address")
              .select("*")
              .eq("email", companyData.email)
              .single();

              const { data: profileData, error: profileError} = await supabase
              .from("profile")
              .select("id")
              .eq("email", companyData.email)
              .single();

              const companyLogo = await supabase
              .storage
              .from('companyLogo')
              .getPublicUrl(`public/${profileData.id}.png`)

              const folderPath = job.id;
              
              const jobAttachments = await supabase
              .storage
              .from('jobAttachments')
              .list(folderPath);


              const publicUrls = jobAttachments['data'].map(file => {

                return supabase
                  .storage
                  .from('jobAttachments')
                  .getPublicUrl(`${folderPath}/${file.name}`).data.publicUrl;
              });

              return {
                number: job.id,
                mode: capitalizeFirstLetter(job.mode),
                type: capitalizeFirstLetter(job.type),
                salary: job.salary,
                company: companyData.name,
                title: job.title,
                description: job.role,
                image: companyLogo.data.publicUrl,
                attachments: publicUrls,
                tags: job.tags,
                location: `${companyAddress.street_address} | ${companyAddress.cityOrProvince}| ${companyAddress.region}`,
                about: companyData.description,
                qualifications: job.qualifications,
                benefits: job.benefits
              };
            }
          })
        )

        setJobCardInfo(jobsWithCompany);
      }

    }

    fetchJobs();
  }, [])

  return (
    <VerificationCheck>
      <div className="flex flex-col justify-between items-center h-screen">
        <div className="-mt-5 sm:mt-20 container sm:pl-[3.5rem] xl:pl-0 flex flex-col sm:flex-row justify-between w-full">
          <FilterJob />
          <div className="flex flex-col gap-4 py-5 px-5">
            {/* <AccordionProgress /> */}
            <div className="w-full flex justify-start flex-wrap flex-grow gap-4">
              {jobCardInfo.map((job) => (
                <Drawer key={job.number}>
                  {" "}
                  {/* Added key to Drawer */}
                  <DrawerTrigger className="w-full sm:w-fit">
                    <JobCard key={job.number} {...job} />
                  </DrawerTrigger>
                  <DrawerContent className="lg:h-[95%] h-screen ">
                    <div className="flex justify-evenly xl:p-14 p-12 items-start overflow-y-scroll ">
                      <div className="flex flex-col justify-start items-start gap-5 lg:min-w-[940px]">
                        <div className="flex justify-between items-center w-full ">
                          <h1 className="text-3xl font-semibold text-foreground">
                            {job.title}
                          </h1>
                          {
                            currentUserRole === 'applicant' && (
                              <div className="flex items-center gap-2">
                                <Button>
                                  <Link
                                    key={job.number}
                                    href={`/pages/apply/${job.number}`}
                                    className="px-10 py-3 text-sm font-medium"
                                  >
                                    Apply
                                  </Link>
                                </Button>
                                <div className="border border-buttonBorder p-3 rounded-md cursor-pointer">
                                  <Share2 className="text-buttonBorder" size={17} />
                                </div>
                              </div>
                            )
                          }                          
                        </div>

                        {/* Removed <div> around <Tag> */}
                        <div className="flex flex-row gap-3">
                          {job.tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
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
                            {/* <div className="flex items-center gap-1">
                              <Star
                                fill="currentColor"
                                size={12}
                                className="text-yellow-300"
                              />
                              <p className="text-sm text-drawer-icon font-normal">
                                {job.ratings} | {job.reviews} reviews
                              </p>
                            </div> */}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <AccessTimeIcon
                              size={14}
                              className="text-drawer-icon text-[20px]"
                            />
                            <p className="text-base text-drawer-icon font-base">
                              {job.type}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <SettingsOutlinedIcon
                              size={14}
                              className="text-drawer-icon text-[20px]"
                            />
                            <span class="material-symbols-outlined">
                              near_me
                            </span>
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
                          <div className="flex gap-4">
                            {
                              job.attachments && (
                                job.attachments.map((attachment) => {
                                  return (
                                    <img
                                    src={attachment}
                                    className="object-contain"
                                    width="300"
                                    height="300"
                                  ></img>
                                  )
                                })
                              )
                            }
                          </div>
                         
                        </div>
                      </div>

                      <div className="w-80 flex flex-col gap-5">
                        <div>
                          <h1 className="text-base font-medium mb-3">
                            Similar Jobs
                          </h1>
                          <div className="flex flex-col gap-2">
                            {jobCardInfo.slice(0, 3).map((similar, i) => (
                              <JobCard key={i} {...similar} />
                            ))}
                          </div>
                        </div>

                        <div>
                          <h1 className="text-base font-medium mb-3">
                            Other Jobs in {job.company}
                          </h1>
                          <div className="flex flex-col gap-2">
                            {jobCardInfo.map((jobInfo, index) => {
                              if (
                                index > 3 &&
                                jobInfo.company === job.company
                              ) {
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
    </VerificationCheck>
  );
};

export default Explore;




