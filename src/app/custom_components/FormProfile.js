"use client";

import React, { useEffect, useState } from "react";
import FetchUserProfile from "@/app/custom_hooks/fetchUserProfile";
import FetchUserAddress from "@/app/custom_hooks/FetchUserAddress";
import { dummyUser } from "../constants";
import { Input } from "@/components/ui/input";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LinkIcon from "@mui/icons-material/Link";
import { dummyResume } from "@assets/index";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormProfile = () => {
  const [currentUserData, setCurrentUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: null,
    gender: "",
    email: "",
    phoneNumber: "",
    resume: null,
  });
  const [currentUserAddress, setCurrentUserAddress] = useState({
    region: "",
    regionCode: "",
    cityOrProvince: "",
    streetAddress: "",
  });
  const [socialLinks, setSocialLinks] = useState(currentUserData.socialLinks || [""]);
  const [regionsState, setRegionsState] = useState([]);
  const [provinceCityState, setProvincesCityState] = useState([]);
  
  const { userAddress } = FetchUserAddress();
  const { userData } = FetchUserProfile();

  useEffect(() => {
    if (userData) {
      setCurrentUserData({
        firstName: userData.first_name,
        middleName: userData.middle_name,
        lastName: userData.last_name,
        birthDate: userData.birth_date,
        gender: userData.gender,
        email: userData.email,
        phoneNumber: userData.phone_number,
        resume: userData.resume,
      });
    }

    if (userAddress) {
      setCurrentUserAddress({
        region: userAddress.region,
        regionCode: userAddress.regionCode,
        cityOrProvince: userAddress.cityOrProvince,
        streetAddress: userAddress.street_address,
      });
    }
  }, [userAddress, userData]);

  const handleChange = (e, name) => {
    if (e && e.target) {
      // For regular input events
      const { name, value } = e.target;
      // Apply phone number formatting
      if (name === "phoneNumber") {
        let formattedValue = formatPhoneNumber(value);
        setCurrentUserData({ ...userData, [name]: formattedValue });
      } else {
        setCurrentUserData({ ...userData, [name]: value });
      }
    } else if (name) {
      // For Select component
      setCurrentUserData({ ...userData, [name]: e });
    }
  };

  const addSocialLinkInput = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeSocialLinkInput = (index) => {
    if (socialLinks.length > 1) {
      const newSocialLinks = [...socialLinks];
      newSocialLinks.splice(index, 1);
      setSocialLinks(newSocialLinks);
      setCurrentUserData({ ...userData, socialLinks: newSocialLinks });
    }
  };

  const handleSocialLinkInputChange = (index, event) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index] = event.target.value;
    setSocialLinks(newSocialLinks);
    setCurrentUserData({ ...userData, socialLinks: newSocialLinks });
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    value = value.replace(/\D/g, "");

    // Ensure it starts with "09"
    if (value.startsWith("09")) {
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
    } else {
      value = "09" + value.slice(0, 9);
    }

    return value;
  };

  async function generateRegions() {
    const response = await fetch(`https://psgc.gitlab.io/api/regions.json`);
    const regions = await response.json();
    const regionsStorage = regions.map((region) => ({
      name: region.name,
      code: region.code,
    }));
    setRegionsState(regionsStorage);
  }

  useEffect(() => {
    generateRegions();
  }, []);

  useEffect(() => {
    if (regionsState.length > 0 && userData) {
      const region = regionsState.find((region) => region.name === userData.region);
      if (region) {
        findProvince(region.name);
      }
    }
  }, [regionsState, userData]);

  return (
    <div className="flex-1 rounded-xl p-8 border shadow-md bg-background">
      <h1 className="mb-2 text-lg font-semibold">Basic Information</h1>
      <table className="table-fixed w-full mb-6 border-separate border-spacing-y-2">
        <tbody>
          <tr>
            <td className="w-[140px] text-muted-foreground">First Name:</td>
            <td>
              <div className="w-full mb-2">
                <Input
                  id="firstName"
                  type="text"
                  placeholder="e.g. John"
                  name="firstName"
                  onInputHandleChange={handleChange}
                  value={currentUserData["firstName"] || ""}
                  className="mt-1"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Middle Name:</td>
            <td>
              <Input
                id="middleName"
                type="text"
                placeholder="e.g. John"
                name="middleName"
                onInputHandleChange={handleChange}
                value={currentUserData["middleName"] || ""}
                className="mt-1"
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Last Name:</td>
            <td>
              <Input
                id="lastName"
                type="text"
                placeholder="e.g. John"
                name="lastName"
                onInputHandleChange={handleChange}
                value={currentUserData["lastName"] || ""}
                className="mt-1"
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Birthdate:</td>
            <td>
              <Input
                id="birthDate"
                type="date"
                name="birthDate"
                onInputHandleChange={handleChange}
                value={currentUserData["birthDate"] || ""}
                className="mt-1"
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Gender:</td>
            <td>
              <Select
                id="gender"
                name="gender"
                onValueChange={(value) => {
                  handleChange(value, "gender");
                }}
                defaultValue={currentUserData["gender"] || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                  <SelectItem value="prefer-no-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>

      <h1 className="mb-2 text-lg font-semibold">Contact Information</h1>
      <table className="table-fixed w-full mb-6 border-separate border-spacing-y-2">
        <tbody>
          <tr>
            <td className="w-[140px] text-muted-foreground">Email:</td>
            <td>
              <Input
                id="email"
                type="text"
                placeholder="e.g. johndoe@mail.com"
                name="email"
                onInputHandleChange={handleChange}
                value={currentUserData["email"] || ""}
                className="mt-1"
                disabled
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Phone:</td>
            <td>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="e.g. 09XXXXXXXXX"
                name="phoneNumber"
                onInputHandleChange={handleChange}
                value={currentUserData["phoneNumber"] || ""}
                className="mt-1"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h1 className="mb-2 text-lg font-semibold">Address</h1>
      <table className="table-fixed w-full mb-6 border-separate border-spacing-y-2">
        <tbody>
          <tr>
            <td className="w-[140px] text-muted-foreground">Region:</td>
            <td>
              <Select
                id="region"
                name="region"
                onValueChange={(value) => {
                  handleLocationChange(value, "region");
                }}
                value={currentUserAddress.region || ""}
                >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Please select..." />
                </SelectTrigger>
                <SelectContent>
                  {
                    regionsState.map((region, i) => <SelectItem value={region.name} key={i}>{region.name}</SelectItem> )
                  }
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">City/Province:</td>
            <td>
              {/* <Input
                variant="default"
                size="sm"
                value={userData.province}
                onChange={(e) => handleChange(e, "province")}
              /> */}
              <Select
                id="cityOrProvince"
                name="cityOrProvince"
                onValueChange={(value) => {
                  handleLocationChange(value, "cityOrProvince");
                }}
                value={currentUserAddress["cityOrProvince"] || ""}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Please select..." />
                </SelectTrigger>
                <SelectContent>
                  {
                    provinceCityState.map((provinceCity, i) => <SelectItem value={provinceCity.name} key={i}>{provinceCity.name}</SelectItem>)
                  }
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Street Address:</td>
            <td>
              <Input
                id="streetAddress"
                type="text"
                // placeholder="e.g. John"
                name="streetAddress"
                onInputHandleChange={handleChange}
                value={currentUserAddress["streetAddress"] || ""}
                className="mt-1"
              ></Input>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className="flex items-center mb-2">
        <h1 className="text-lg font-semibold">Resume or Curriculum Vitae</h1>
        <Button variant="default" size="sm" className="ml-auto">
          Upload new
        </Button>
      </div>
      <iframe
        src={dummyResume}
        className="w-full h-[400px] rounded-lg border mb-6"
      ></iframe>

      <h1 className="mb-4 text-lg font-semibold">Cover Letter</h1>
      <Textarea
        id="additionalLetter"
        name="additionalLetter"
        className="border border-input-border bg-input resize-none min-h-[120px] mt-1 mb-6 tracking-wide"
      />

      <h1 className="mb-4 text-lg font-semibold">Social Links</h1>
      <div className="w-full mb-6">
        <div className="flex flex-col gap-2 mt-1">
          {dummyUser.socialLinks.map((link, index) => (
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
            className="text-xs text-checkbox-text mt-2"
          >
            Add Social Link
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default FormProfile;
