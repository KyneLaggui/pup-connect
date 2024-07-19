"use client";

import React, { useEffect, useState, useRef } from "react";
import FetchCompanyProfileId from "@/app/custom_hooks/fetchCompanyProfileId";
import FetchCompanyAddressId from "@/app/custom_hooks/FetchCompanyAddressId";
import { Tag } from "@/app/custom_components/Tag";
import { companyTags, dummyUser } from "../constants";
import { Input } from "@/components/ui/input";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { dummyImage } from "@assets/index";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/utils/supabase/client";
import FormsLabel from "./FormsLabel";

const FormProfileCompany = () => {
  const [currentUserData, setCurrentUserData] = useState({
    name: "",
    email: "",
    description: "",
    id: "",
    tags: [],
    logo: null,
  });
  const [currentUserAddress, setCurrentUserAddress] = useState({
    region: "",
    regionCode: "",
    cityOrProvince: "",
    streetAddress: "",
  });

  const [invalidFields, setInvalidFields] = useState({
    name: false,
    email: false,
    description: false,
    tags: false,
    logo: false,
    region: false,
    regionCode: false,
    cityOrProvince: false,
    streetAddress: false,
  }); // track invalid fields

  const [socialLinks, setSocialLinks] = useState(
    currentUserData.socialLinks || [""]
  );
  const [selectedTags, setSelectedTags] = useState([]);
  const [regionsState, setRegionsState] = useState([]);
  const [provinceCityState, setProvincesCityState] = useState([]);

  const imageInputRef = useRef(null);

  const { id } = useParams();
  const { userAddress } = FetchCompanyAddressId(id);
  const { userData } = FetchCompanyProfileId(id);

  const handleChange = (e, name) => {
    if (e && e.target) {
      if (e.target.type === "file") {
        // For file input events
        const { name } = e.target;
        const file = e.target.files[0];
        setCurrentUserData({ ...currentUserData, [name]: file });
      } else {
        // For regular input events
        const { name, value } = e.target;
        if (name === "streetAddress") {
          setCurrentUserAddress({ ...currentUserAddress, [name]: value });
        } else {
          setCurrentUserData({ ...currentUserData, [name]: value });
        }
      }
    } else if (name) {
      // For Select component
      setCurrentUserData({ ...currentUserData, [name]: e });
    }
  };

  const handleLocationChange = async (e, name) => {
    if (name === "region") {
      await findProvince(e);
      setCurrentUserAddress((prevCurrentAddress) => ({
        ...prevCurrentAddress,
        [name]: e,
        cityOrProvince: "",
      }));
    } else if (name === "cityOrProvince") {
      setCurrentUserAddress((prevCurrentAddress) => ({
        ...prevCurrentAddress,
        [name]: e,
      }));
    }
  };

  const handleImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      return prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];
    });
  };

  const addSocialLinkInput = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeSocialLinkInput = (index) => {
    if (socialLinks.length > 1) {
      const newSocialLinks = [...socialLinks];
      newSocialLinks.splice(index, 1);
      setSocialLinks(newSocialLinks);
      setCurrentUserData({ ...currentUserData, socialLinks: newSocialLinks });
    }
  };

  const handleSocialLinkInputChange = (index, event) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index] = event.target.value;
    setSocialLinks(newSocialLinks);
    setCurrentUserData({ ...currentUserData, socialLinks: newSocialLinks });
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

  async function findProvince(regionName) {
    const region = regionsState.find((region) => region.name === regionName);
    setCurrentUserAddress((prevUserData) => ({
      ...prevUserData,
      regionCode: region.code,
    }));

    const response = await fetch(
      `https://psgc.gitlab.io/api/regions/${region.code}/provinces.json`
    );
    const provinces = await response.json();
    const secondResponse = await fetch(
      `https://psgc.gitlab.io/api/regions/${region.code}/cities.json`
    );
    const cities = await secondResponse.json();

    const provincesStorage = provinces.map((province) => ({
      name: province.name,
      code: province.code,
    }));
    const citiesStorage = cities.map((city) => ({
      name: city.name,
      code: city.code,
    }));

    let cityAndProvince = [...provincesStorage, ...citiesStorage].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setProvincesCityState(cityAndProvince);
  }

  const checkEmpty = (value) => {
    return value === "";
  };

  const isDateCurrentOrFuture = (dateToCheck) => {
    // Get the current date and time
    const currentDate = new Date();

    // Create a Date object from the dateToCheck string
    const checkDate = new Date(dateToCheck);

    // Check if the given date is greater than or equal to the current date
    if (checkDate >= currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const isValidPhilippinesMobileNumber = (phoneNumber) => {
    // Define the regular expression pattern for mobile numbers
    const mobilePattern = /^(?:\+63|0)9\d{9}$/;

    // Remove spaces from the phone number for easier matching
    phoneNumber = phoneNumber.replace(/\s+/g, "");

    // Check if the phone number matches the mobile pattern
    return mobilePattern.test(phoneNumber);
  };

  const checkInputErrors = async () => {
    let newInvalidFields = {
      name: false,
      email: false,
      description: false,
      tags: false,
      logo: false,
      region: false,
      regionCode: false,
      cityOrProvince: false,
      streetAddress: false,
    };

    const companyUpdateResult = await supabase
      .from("company")
      .update({
        name: currentUserData.name,
        email: currentUserData.email,
        description: currentUserData.description,
        tags: currentUserData.tags,
        logo: currentUserData.gender,
      })
      .eq("email", currentUserData.email);

    if (companyUpdateResult.error) {
      console.log("An error has occured!");
      console.log(companyUpdateResult.error);
    } else {
      console.log("Profile updated successfully!");
    }

    const addressUpdateResult = await supabase
      .from("company_address")
      .update({
        region: currentUserAddress.region,
        cityOrProvince: currentUserAddress.cityOrProvince,
        street_address: currentUserAddress.streetAddress,
        region_code: currentUserAddress.regionCode,
      })
      .eq("email", currentUserData.email);

    if (addressUpdateResult.error) {
      console.log("An error has occured!");
    } else {
      console.log("Address updated successfully!");
    }

    if (currentUserData.logo && currentUserData["logo"] instanceof File) {
      const logoFileExt = currentUserData.logo.name.split(".").pop();
      // const rawEmail = (userData.email).replace(/\.com$/, '')

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const logoResult = await supabase.storage
          .from("companyLogo")
          .upload(`public/${user.id}.${logoFileExt}`, currentUserData.logo, {
            cacheControl: "3600",
            upsert: true,
          });

        if (logoResult.error) {
          console.log(logoResult.error);
        } else {
          console.log(logoResult.data);
        }
      }
    }
  };

  const handleSubmit = () => {
    checkInputErrors();
  };

  useEffect(() => {
    if (userData) {
      setCurrentUserData({
        ...currentUserData,
        name: userData.name,
        description: userData.description,
        email: userData.email,
        tags: userData.tags,
        socialLinks: userData.social_links,
        id: userData.id,
      });

      setSelectedTags(userData.tags);
      setSocialLinks(userData.social_links);
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

  useEffect(() => {
    const getResume = async () => {
      if (userData) {
        const result = await supabase.storage
          .from("companyLogo")
          .getPublicUrl(`public/${userData.id}.png`);

        if (result.data) {
          setCurrentUserData({
            ...currentUserData,
            logo: result.data.publicUrl,
          });
        }
      }
    };

    getResume();
  }, [userData]);

  useEffect(() => {
    generateRegions();
  }, []);

  useEffect(() => {
    if (regionsState.length > 0 && userAddress) {
      const region = regionsState.find(
        (region) => region.name === userAddress.region
      );
      if (region) {
        findProvince(region.name);
      }
    }
  }, [regionsState, userData]);

  useEffect(() => {
    setCurrentUserData((prevData) => ({
      ...prevData,
      tags: selectedTags,
    }));
  }, [selectedTags, setCurrentUserData]);

  useEffect(() => {
    console.log(currentUserData);
  }, [currentUserData]);

  return (
    <div className="flex-1 rounded-xl p-8 border shadow-md bg-background content-end max-w-screen-sm">
      <h1 className="text-lg font-semibold">Company Logo</h1>
      <div className="mb-2">
        <input
          type="file"
          id="logo"
          name="logo"
          onChange={handleChange}
          accept="image/png"
          ref={imageInputRef}
          className="hidden"
        ></input>
        <div
          onClick={handleImageUploadClick}
          className="overflow-hidden mx-auto w-fit aspect-square rounded-lg"
        >
          {currentUserData["logo"] ? (
            <Image
              className="aspect-square object-cover"
              alt="logo"
              src={
                currentUserData["logo"] instanceof File
                  ? URL.createObjectURL(currentUserData["logo"])
                  : currentUserData["logo"]
              }
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
      {/* <Button variant="default" size="sm" className="ml-auto relative cursor-pointer">
        Upload new
        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-[0]" id="logo" name="logo" onChange={handleChange}/>
      </Button> */}
      <div class="space-y-6">
        <div>
          <h1 className="mb-2 text-lg font-semibold">Basic Information</h1>
          <table className="table-fixed w-full border-separate border-spacing-y-2">
            <tbody>
              <tr>
                <td className="w-[140px] text-muted-foreground">
                  Company Name:
                </td>
                <td>
                  <div className="w-full mb-2">
                    <Input
                      id="name"
                      type="text"
                      placeholder="e.g. John"
                      name="name"
                      onInputHandleChange={handleChange}
                      value={currentUserData["name"] || ""}
                      className="mt-1"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
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
            </tbody>
          </table>
        </div>
        <div>
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
                      {regionsState.map((region, i) => (
                        <SelectItem value={region.name} key={i}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="text-muted-foreground">City/Province:</td>
                <td>
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
                      {provinceCityState.map((provinceCity, i) => (
                        <SelectItem value={provinceCity.name} key={i}>
                          {provinceCity.name}
                        </SelectItem>
                      ))}
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
        </div>
        <div className="flex justify-end">
          {currentUserData.resumeName
            ? `Uploaded File: ${currentUserData.resumeName}`
            : ""}
        </div>
        <div>
          <h1 className="mb-2 text-lg font-semibold">Company Tags</h1>
          <div className="flex flex-col items-center">
            <div
              className={`flex flex-wrap gap-3 justify-center mb-6 transition-all duration-500 ease-in-out`}
            >
              {companyTags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Tag
                    variant="static"
                    size="default"
                    state={selectedTags.includes(tag) ? "selected" : "default"}
                    onClick={() => handleTagClick(tag)}
                    className="cursor-pointer"
                  >
                    {tag}
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h1 className="mb-4 text-lg font-semibold">Description</h1>
          <Textarea
            id="description"
            name="description"
            className="border border-input-border bg-input resize-none min-h-[120px] mt-1"
            onChange={handleChange}
            value={currentUserData["description"] || ""}
          />
        </div>
        <div>
          <h1 className="mb-4 text-lg font-semibold">Social Links</h1>
          <div className="w-full mb-6">
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
                    className="border-0"
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
        <div className="flex justify-end">
          <Button variant="default" size="sm" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormProfileCompany;
