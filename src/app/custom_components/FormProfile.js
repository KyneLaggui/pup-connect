"use client";

import React, { useEffect, useState } from "react";
import FetchUserProfileId from "@/app/custom_hooks/fetchUserProfileId";
import FetchUserAddressId from "@/app/custom_hooks/FetchUserAddressId";
import { dummyUser } from "../constants";
import { Input } from "@/components/ui/input";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/utils/supabase/client";

const FormProfile = () => {
  const [currentUserData, setCurrentUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: null,
    gender: "",
    email: "",
    phoneNumber: "",
    coverLetter: "",
    resume: null,
    resumeDisplay: null,
    resumeName: null
  });
  const [currentUserAddress, setCurrentUserAddress] = useState({
    region: "",
    regionCode: "",
    cityOrProvince: "",
    streetAddress: "",
  });

  const [newInvalidFields, setNewInvalidFields] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    gender: false,
    email: false,
    phoneNumber: false,
    address: false,
    region: false,
    cityOrProvince: false,
    streetAddress: false,
    coverLetter: false,
    resume: false,
  }); // track invalid fields

  const [socialLinks, setSocialLinks] = useState(currentUserData.socialLinks || [""]);
  const [regionsState, setRegionsState] = useState([]);
  const [provinceCityState, setProvincesCityState] = useState([]);
  
  const { id } = useParams();
  const { userAddress } = FetchUserAddressId(id);
  const { userData } = FetchUserProfileId(id);

  const handleChange = (e, name) => {
    if (e && e.target) {
      if (e.target.type === "file") {
        // For file input events
        const { name } = e.target;
        const file = e.target.files[0];
        const fileNameProperty = `${name}Name`    
        setCurrentUserData({ ...currentUserData, [name]: file, [fileNameProperty]: file.name });
      } else {
        // For regular input events
        const { name, value } = e.target;
        // Apply phone number formatting
        if (name === "phoneNumber") {
          let formattedValue = formatPhoneNumber(value);
          setCurrentUserData({ ...currentUserData, [name]: formattedValue });
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
      setCurrentUserAddress((prevCurrentAddress) => ({ ...prevCurrentAddress, [name]: e, cityOrProvince: "" }));
    } else if (name === "cityOrProvince") {
      setCurrentUserAddress((prevCurrentAddress) => ({ ...prevCurrentAddress, [name]: e }));
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
    setCurrentUserAddress((prevUserData) => ({ ...prevUserData, regionCode: region.code }));

    const response = await fetch(`https://psgc.gitlab.io/api/regions/${region.code}/provinces.json`);
    const provinces = await response.json();
    const secondResponse = await fetch(`https://psgc.gitlab.io/api/regions/${region.code}/cities.json`);
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
  }

  const isValidPhilippinesMobileNumber = (phoneNumber) => {
    // Define the regular expression pattern for mobile numbers
    const mobilePattern = /^(?:\+63|0)9\d{9}$/;

    // Remove spaces from the phone number for easier matching
    phoneNumber = phoneNumber.replace(/\s+/g, '');

    // Check if the phone number matches the mobile pattern
    return mobilePattern.test(phoneNumber);
  }

  const checkInputErrors = async () => {
    if (checkEmpty(currentUserData.firstName)) newInvalidFields.firstName = true;
    if (checkEmpty(currentUserData.lastName)) newInvalidFields.lastName = true;
    if (!currentUserData.birthDate || isDateCurrentOrFuture(currentUserData.birthDate) ) newInvalidFields.birthDate = true;
    if (checkEmpty(currentUserData.gender)) newInvalidFields.gender = true;

    if (checkEmpty(currentUserData.email)) newInvalidFields.email = true;
    if (checkEmpty(currentUserData.phoneNumber) || !isValidPhilippinesMobileNumber(currentUserData.phoneNumber)) newInvalidFields.phoneNumber = true;
    if (checkEmpty(currentUserData.region)) newInvalidFields.region = true;
    if (checkEmpty(currentUserData.cityOrProvince)) newInvalidFields.cityOrProvince = true;
    if (checkEmpty(currentUserData.streetAddress)) newInvalidFields.streetAddress = true;
  
    if (checkEmpty(currentUserData.coverLetter)) newInvalidFields.coverLetter = true;
    // if (!currentUserData.resume) newInvalidFields.resume = true;
    if (currentUserData.resume && currentUserData.resume.name && ((currentUserData.resume.name).split('.').pop().toLowerCase() !== 'pdf' 
    || (currentUserData.resume.type) !== 'application/pdf'))  {
      newInvalidFields.resume = true
    }

    if (Object.keys(newInvalidFields).length > 0) {
      setNewInvalidFields(newInvalidFields);
    } else {
      setNewInvalidFields({});
      
      console.log(user)
    }
  }

  const handleSubmit = () => {
    checkInputErrors();
  }

  useEffect(() => {
    if (userData) {
      setCurrentUserData({
        ...currentUserData,
        firstName: userData.first_name,
        middleName: userData.middle_name,
        lastName: userData.last_name,
        birthDate: userData.birth_date,
        gender: userData.gender,
        email: userData.email,
        phoneNumber: userData.phone_number,
        coverLetter: userData.cover_letter,
        socialLinks: userData.social_links
      });

      setSocialLinks(userData.social_links)
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
    const getResume = async() => {
      const { data: { user } } = await supabase.auth.getUser()  

      if (user) {
        const result = await supabase
        .storage
        .from('resume')
        .getPublicUrl(`public/${user.id}.pdf`)
        
        if (result.data) {
          setCurrentUserData({...currentUserData, resumeDisplay: result.data.publicUrl})
        }  
      }
    } 

    getResume()
  }, [])

    useEffect(() => {
      generateRegions();
    }, []);

  useEffect(() => {
    if (regionsState.length > 0 && userAddress) {      
      const region = regionsState.find((region) => region.name === userAddress.region);
      if (region) {
        findProvince(region.name);
      }
    }
  }, [regionsState, userData]);

  useEffect(() => {
    console.log(currentUserData)
  }, [currentUserData])

  return (
    <div className="flex-1 rounded-xl p-8 border shadow-md bg-background content-end">
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
                value={currentUserData["gender"]}
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

      <div className="flex items-center mb-2">
      <h1 className="text-lg font-semibold">Resume or Curriculum Vitae</h1>
      <Button variant="default" size="sm" className="ml-auto relative cursor-pointer">
        Upload new
        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-[0]" id="resume" name="resume" onChange={handleChange}/>
      </Button>
      </div>
      <div className="flex justify-end">
          {currentUserData.resumeName ? `Uploaded File: ${currentUserData.resumeName}` : ""}           
      </div>
      <iframe
        src={currentUserData['resumeDisplay'] || ""}
        className="w-full h-[400px] rounded-lg border mb-6"
      ></iframe>
      <h1 className="mb-4 text-lg font-semibold">Cover Letter</h1>
      <Textarea
          id="coverLetter"
          name="coverLetter"
          className="border border-input-border bg-input resize-none min-h-[120px] mt-1"
          onChange={handleChange}
          value={currentUserData["coverLetter"] || ""}
        />

      <h1 className="mb-4 text-lg font-semibold">Social Links</h1>
      <div className="w-full mb-6">
        <div className="flex flex-col gap-2 mt-1">
        {socialLinks.map((link, index) => (
            <div key={index} className="flex items-center rounded-md border border-input-border bg-input">
              <div className="p-1 h-full border-r border-muted">
                <LinkIcon className="rotate-90 w-[20px] h-[20px] text-drawer-icon" />
              </div>
              <Input
                type="text"
                value={link}
                onInputHandleChange={(event) => handleSocialLinkInputChange(index, event)}
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
          <button onClick={addSocialLinkInput} className="text-xs text-checkbox-text">
            Add Social Link
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="default" size="sm" onClick={handleSubmit}>
            Save Changes
        </Button>
      </div>
    </div>
  );
};

export default FormProfile;
