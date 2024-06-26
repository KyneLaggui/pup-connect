"use client";
import React, { useEffect, useState } from "react";
import VerificationCheck from "@/layouts/VerificationCheck";
import Image from "next/image";
import { microsoftLogo } from "@assets/index";
import FormsLabel from "@/app/custom_components/FormsLabel";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useParams, useRouter } from "next/navigation";
import { jobCardInfo } from "../../../constants";

const page = ({ job }) => {
  const [socialLinks, setSocialLinks] = useState([""]);
  const [jobInfo, setJobInfo] = useState({
    title: "",
    company: "",
    image: "",
  });

  const params = useParams();

  const addSocialLinkInput = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeSocialLinkInput = (index) => {
    if (socialLinks.length > 1) {
      const newSocialLinks = [...socialLinks];
      newSocialLinks.splice(index, 1);
      setSocialLinks(newSocialLinks);
    }
  };

  const handleSocialLinkInputChange = (index, event) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index] = event.target.value;
    setSocialLinks(newSocialLinks);
  };

  useEffect(() => {
    const designatedJob = jobCardInfo.filter((item) => {
      return parseInt(item.number) === parseInt(params.id);
    });

    setJobInfo({
      title: designatedJob[0].title,
      company: designatedJob[0].company,
      image: designatedJob[0].image,
    });
  }, []);

  return (
    <VerificationCheck>
    <div className="">
      <div className="container flex items-center justify-center ">
        <div className="flex flex-col gap-6 max-w-[800px] w-full px-2 pt-10 pb-[80px]">
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex gap-3 items-center">
              <Image
                src={jobInfo.image}
                alt="Company logo"
                className="w-[30px] h-[30px]"
              />
              <h1 className="text-2xl font-semibold text-color-foreground ">
                {jobInfo.company}
              </h1>
            </div>
            <div>
              <p className="text-xl font-semibold text-color-foreground">
                {jobInfo.title}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
            <h1 className="mb-3 text-lg font-medium">Basic Information</h1>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="First Name" label="firstname" />
                  <Input type="text" name="firstName" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="Last Name" label="lastname" />
                  <Input type="text" name="lastName" />
                </div>
              </div>

              <div className="flex justify-start gap-6 ">
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="Email" label="email" />
                  <Input type="email" name="emailAdd" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="Phone (Optional)" label="phone" />
                  <Input type="tel" name="phoneNum" />
                </div>
              </div>

              <div>
                <FormsLabel text="Address" label="address" />
                <Input type="text" name="address" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
            <h1 className="mb-3 text-lg font-medium">Education</h1>
            <div className="flex justify-between gap-6">
              <div className="flex flex-col gap-2 w-full">
                <FormsLabel text="Branch" label="branchSchool" />
                <Input type="text" name="branchSchool" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <FormsLabel text="Course" label="courseSchool" />
                <Input type="text" name="courseSchool" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <FormsLabel text="Year" label="yearSchool" />
                <Input type="text" name="yearSchool" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
            <h1 className="mb-3 text-lg font-medium">
              Cover Letter and Resume
            </h1>

            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-2">
                <FormsLabel text="Cover Letter" label="coverLetter" />
                <Textarea
                  className=" border border-input-border bg-input resize-none min-h-[120px]"
                  name="coverLetter"
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormsLabel
                  text="Resume / Curriculum Vitae"
                  label="formsLetter"
                />
                <Input
                  type="file"
                  name="formsLetter"
                  className="text-forms-placeholder"
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormsLabel text="Additional Notes" label="additionalLetter" />
                <Textarea
                  className=" border border-input-border bg-input resize-none min-h-[120px]"
                  name="additionalLetter"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
            <h1 className="mb-3 text-lg font-medium">Social Links</h1>
            <div className="flex flex-col gap-2 ">
              {socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-md border border-input-border bg-input"
                >
                  <div className="p-1 h-full border-r border-muted">
                    <LinkIcon className="rotate-90 w-[20px] h-[20px] text-drawer-icon" />
                  </div>
                  <Input
                    type="text"
                    value={link}
                    onInputHandleChange={(event) =>
                      handleSocialLinkInputChange(index, event)
                    }
                    name={`socialLink-${index}`}
                    className="border-0 "
                  />
                  <div className="p-2">
                    <RemoveCircleIcon
                      className="w-[15px] h-[15px] text-drawer-icon cursor-pointer"
                      onClick={() => removeSocialLinkInput(index)}
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addSocialLinkInput}
                
              >
                Add Social Link
              </Button>
            </div>
          </div>

          <Button>Submit</Button>
        </div>
      </div>
    </div>
    </VerificationCheck>
  );
};

export default page;
