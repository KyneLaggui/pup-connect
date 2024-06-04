import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useContext, useEffect, useState, useRef } from "react";
import FormsLabel from "@/app/custom_components/FormsLabel";
import { StepperContext } from "../StepperContext";
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Image from "next/image";

import { dummyImage } from "@assets/index";
import { useToast } from "@/components/ui/use-toast";

const BasicInformation = () => {
  const { toast } = useToast();
  const imageInputRef = useRef(null);
  const { companyData, setCompanyData } = useContext(StepperContext);
  const [socialLinks, setSocialLinks] = useState(
    companyData.socialLinks || [""]
  );

  const handleChange = (e, name) => {
    if (e && e.target) {
      if (e.target.type === "file") {
        // For file input events
        const { name } = e.target;
        const file = e.target.files[0];
        setCompanyData({ ...companyData, [name]: file });
      } else if (e.target.type === "password") {
        // For password input events
        if (e.target.value.length < 8) {
          toast({
            title: "Password too short",
            description:
              "Please enter a password that is at least 8 characters.",
          });
        } else if (e.target.value.length > 32) {
          toast({
            title: "Password too long",
            description:
              "Please enter a password that is less than 32 characters.",
          });
        }
      } else {
        // For regular input events
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
      }
    } else if (name) {
      // For Select component
      setCompanyData({ ...companyData, [name]: e });
    }
  };

  // useEffect(() => {
  //   console.log(companyData);
  // }, [companyData]);

  const addSocialLinkInput = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeSocialLinkInput = (index) => {
    if (socialLinks.length > 1) {
      const newSocialLinks = [...socialLinks];
      newSocialLinks.splice(index, 1);
      setSocialLinks(newSocialLinks);
      setCompanyData({ ...companyData, socialLinks: newSocialLinks });
    }
  };

  const handleSocialLinkInputChange = (index, event) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index] = event.target.value;
    setSocialLinks(newSocialLinks);
    setCompanyData({ ...companyData, socialLinks: newSocialLinks });
  };

  const handleImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 200000) {
      toast({
        title: "File size too large",
        description: "Please upload a file that is less than 200KB.",
      });
      return;
    } else {
      setCompanyData({ ...companyData, logo: file });
      console.log(file);
      console.log(file.size);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
        ></input>
        <div
          onClick={handleImageUploadClick}
          className="overflow-hidden mx-auto w-fit aspect-square rounded-lg"
        >
          {companyData["logo"] ? (
            <Image
              className="aspect-square object-cover"
              alt="logo"
              src={URL.createObjectURL(companyData["logo"])}
              width={100}
              height={100}
            />
          ) : (
            <Image
              className="aspect-square object-cover border"
              alt="dummyLogo"
              src={dummyImage}
              width={100}
              height={100}
            />
          )}
        </div>
      </div>

      {/* <div className="mb-2">
        <FormsLabel text="Logo" label="logo" />
        <Input
          type="file"
          id="logo"
          name="logo"
          className="text-forms-placeholder mt-1"
          onInputHandleChange={handleChange}
        />
        {companyData["logo"] && (
          <p className="mt-2 text-sm text-muted-foreground tracking-wide">
            Selected file: {companyData["logo"].name}
          </p>
        )}
      </div> */}

      <div className="w-full mb-2">
        <FormsLabel text="Name" label="name" />
        <Input
          id="name"
          type="text"
          placeholder="e.g. Microsoft"
          name="name"
          onInputHandleChange={handleChange}
          value={companyData["name"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="City" label="city" />
        <Input
          id="city"
          type="text"
          placeholder="e.g. Quezon City"
          name="city"
          onInputHandleChange={handleChange}
          value={companyData["city"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Middle name" label="middleName" />
        <Input
          id="middleName"
          type="text"
          placeholder="e.g. Middle"
          name="middleName"
          onInputHandleChange={handleChange}
          value={companyData["middleName"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Last name" label="lastName" />
        <Input
          id="lastName"
          type="text"
          placeholder="e.g. Doe"
          name="lastName"
          onInputHandleChange={handleChange}
          value={companyData["lastName"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Birthdate" label="birthDate" />
        <Input
          id="birthDate"
          type="date"
          // placeholder="e.g. Doe"
          name="birthDate"
          onInputHandleChange={handleChange}
          value={companyData["birthDate"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Gender" label="gender" />
        <Select
          id="gender"
          name="gender"
          onValueChange={(value) => {
            handleChange(value, "gender");
          }}
          defaultValue={companyData["gender"] || ""}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Please select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="others">Others</SelectItem>
            <SelectItem value="prefer-no-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full mb-2">
        <div className="mb-3">
          <h3 className="text-base font-semibold">Social links</h3>

          <p className="text-sm text-muted-foreground">
            Add your all social URLs.
          </p>
        </div>
        {/* <FormsLabel text="Social links" label="social" /> */}
        <div className="flex flex-col gap-2 mt-1">
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
              <div className="group p-2 cursor-pointer">
                <RemoveCircleIcon
                  className="w-[15px] h-[15px] text-drawer-icon group-hover:text-red-500 duration-500 transition-colors ease-in-out"
                  onClick={() => removeSocialLinkInput(index)}
                />
              </div>
            </div>
          ))}
          <button
            onClick={addSocialLinkInput}
            className="text-xs text-checkbox-text"
          >
            Add Social Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
