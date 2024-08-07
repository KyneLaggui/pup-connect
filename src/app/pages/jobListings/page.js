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
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "@/redux/slice/authSlice";
import ImageZoom from "@/app/custom_components/ImageZoom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Alert } from "@/app/custom_components/Alert";
import { useRouter } from "next/navigation";

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [publishedJobs, setPublishedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const jobs = jobTableV2;

  const userEmail = useSelector(selectEmail);
  const router = useRouter();

  // const filteredJobs = jobs.filter((job) =>
  //   job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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

  const capitalizeFirstLetter = (str) => {
    // Check if the string is empty
    if (str === "") return "";

    // Capitalize the first letter and concatenate with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const deleteJob = async(id) => {
    const jobDeletion = await supabase
      .from('job')
      .delete()
      .eq('id', id)

    console.log(jobDeletion)
    if (!jobDeletion.error) {
      Alert("success", "Deletion Successful", "You have successfully deleted a job.");            
    } else {
      Alert(
        "error",
        "Deletion Failed",
        "An error has occured."
      );
    }
  }

  useEffect(() => {
    if (userEmail) {
      const fetchJobs = async () => {
        const { data: companyData, error: companyError } = await supabase
          .from("company")
          .select("*")
          .eq("email", userEmail)
          .single();

        if (companyError) {
          throw companyError;
        } else {
          const { data: companyAddress, error: companyAddressError } =
            await supabase
              .from("company_address")
              .select("*")
              .eq("email", companyData.email)
              .single();

          const companyLogo = await supabase.storage
            .from("companyLogo")
            .getPublicUrl(`public/${companyData.id}.png`);

          // Getting all published jobs by the logged in company
          const jobFetching = await supabase
            .from("job")
            .select("*")
            .eq("email", userEmail);

          if (jobFetching.data) {
            const publishedJobs = await Promise.all(
              jobFetching.data.map(async (job) => {
                const folderPath = job.id;

                const jobAttachments = await supabase.storage
                  .from("jobAttachments")
                  .list(folderPath);

                const publicUrls = jobAttachments["data"].map((file) => {
                  return supabase.storage
                    .from("jobAttachments")
                    .getPublicUrl(`${folderPath}/${file.name}`).data.publicUrl;
                });

                const { error, data, count } = await supabase
                  .from("job_application")
                  .select("*", { count: "exact" })
                  .eq("job_id", job.id);

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
                  location: `${companyAddress.street_address}, ${companyAddress.cityOrProvince}, ${companyAddress.region}`,
                  about: companyData.description,
                  qualifications: job.qualifications,
                  benefits: job.benefits,
                  createdAt: job.created_at,
                  no_of_applicant: count,
                };
              })
            );

            setPublishedJobs(publishedJobs);
          }
        }
      };
      fetchJobs();
    }
  }, [userEmail]);

  useEffect(() => {
    setFilteredJobs(
      publishedJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, publishedJobs]);

  return (
    <div className="flex">
      <div className="container-sidebar">
        <h1 className="text-2xl font-semibold tracking-tight">Job Listings</h1>
        <p className="text-md font-medium text-muted-foreground mb-4">
          Here are the jobs listed by your company.
        </p>
        <div className="flex gap-3">
          <Input
            type="text"
            value={searchTerm}
            onInputHandleChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search job"
            className="mb-5"
          />
          <Link href='/pages/jobCreation' className="w-full max-w-36"> 
            <Button size="default" className="bg-green-500 w-full">
              Add Job
            </Button>
          </Link>
        </div>
        {/* <div className="grid auto-fit-[300px] gap-4"> */}
        <div className="flex gap-4 flex-col flex-wrap sm:flex-row">
          {filteredJobs.map((job, index) => (
            <Drawer key={job.number}>
              <DrawerTrigger>
                <JobCardCompany
                  key={job.number}
                  {...job}
                  no_of_applicant={job.no_of_applicant}
                />
              </DrawerTrigger>
              <DrawerContent className="lg:h-[95%] h-screen ">
                <div className="flex justify-evenly xl:p-14 p-12 items-start overflow-y-scroll ">
                  <div className="flex flex-col justify-start items-start gap-5 lg:min-w-[940px]">
                    <div className="flex justify-between items-center w-full ">
                      <h1 className="text-3xl font-semibold text-foreground capitalize">
                        {job.title}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Button>
                          <Link
                            key={job.id}
                            href={`/pages/applicants/${job.number}`} // Change this to the correct path
                            className="px-2"
                          >
                            Applicant
                          </Link>
                        </Button>
                        <Button variant="edit" size="icon" onClick={() => router.push(`/pages/jobEdit/${job.number}`)}>
                          <EditOutlinedIcon size={17} />
                        </Button>
                        <Button variant="delete" size="icon" onClick={() => deleteJob(job.number)}>
                          <DeleteOutlineOutlinedIcon size={17} />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="" size={17} />
                        </Button>
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
                          {formatJobType(job.type)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <SettingsOutlinedIcon
                          size={14}
                          className="text-drawer-icon text-[20px]"
                        />
                        <p className="text-base text-drawer-icon font-base">
                          {formatJobMode(job.mode)}
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
                      <div className="flex gap-4">
                        {job.attachments &&
                          job.attachments.map((attachment, index) => {
                            return (
                              // <Image
                              //   key={index}
                              //   alt={`attachment-${index}`}
                              //   src={attachment}
                              //   className="object-cover aspect-square rounded-lg border border-tertiary-border shadow-md cursor-pointer"
                              //   width="180"
                              //   height="180"
                              // ></Image>
                              <ImageZoom
                                src={attachment}
                                alt={`attachment-${index}`}
                                key={index}
                              />
                            );
                          })}
                      </div>
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
