"use client";
import React, { useEffect, useState } from "react";
import VerificationCheck from "@/layouts/VerificationCheck";
import Image from "next/image";
import FormsLabel from "@/app/custom_components/FormsLabel";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'
import { useParams, useRouter } from "next/navigation";
import FetchUserApplicantDetails from "@/app/custom_hooks/fetchUserApplicantDetails";
import { Alert } from "@/app/custom_components/Alert";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/utils/supabase/client";

const page = () => {
  const [jobInfo, setJobInfo] = useState({
    title: "",
    company: "",
    image: "",
    id: ""
  });


  const [currentUserData, setCurrentUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: null,
    gender: "",
    email: "",
    phoneNumber: "",
    coverLetter: "",
    additionalNotes: "",
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

  const [invalidFields, setInvalidFields] = useState({
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
  const { userData } = FetchUserApplicantDetails();
  const router = useRouter();


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
        } else if (name === "birthDate") {
          const today = new Date().toISOString().split("T")[0];
          if (value > today) {
            alert("Birthdate cannot be in the future.");
            return;
          } 
          setCurrentUserData({ ...currentUserData, [name]: value });
        } else if (name === "streetAddress") {
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
    let newInvalidFields = {
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
    }

    if (checkEmpty(currentUserData.firstName)) newInvalidFields.firstName = true;
    if (checkEmpty(currentUserData.lastName)) newInvalidFields.lastName = true;
    if (!currentUserData.birthDate || isDateCurrentOrFuture(currentUserData.birthDate) ) newInvalidFields.birthDate = true;
    if (checkEmpty(currentUserData.gender)) newInvalidFields.gender = true;

    if (checkEmpty(currentUserData.email)) newInvalidFields.email = true;
    if (checkEmpty(currentUserData.phoneNumber) || !isValidPhilippinesMobileNumber(currentUserData.phoneNumber)) newInvalidFields.phoneNumber = true;
    if (checkEmpty(currentUserAddress.region)) newInvalidFields.region = true;
    if (checkEmpty(currentUserAddress.cityOrProvince)) newInvalidFields.cityOrProvince = true;
    if (checkEmpty(currentUserAddress.streetAddress)) newInvalidFields.streetAddress = true;
  
    if (checkEmpty(currentUserData.coverLetter)) newInvalidFields.coverLetter = true;
    // if (!currentUserData.resume) newInvalidFields.resume = true;
    if (currentUserData.resume && currentUserData.resume.name && ((currentUserData.resume.name).split('.').pop().toLowerCase() !== 'pdf' 
    || (currentUserData.resume.type) !== 'application/pdf'))  {
      newInvalidFields.resume = true
    }

    const hasInvalidField = Object.values(newInvalidFields).some(value => value === true)

    if (hasInvalidField) {
      setInvalidFields(newInvalidFields);
    } else {      
      const profileUpdateResult = await supabase
        .from('applicant')
        .update({
          first_name: currentUserData.firstName,
          middle_name: currentUserData.middleName,
          last_name: currentUserData.lastName,
          birth_date: currentUserData.birthDate,
          gender: currentUserData.gender,
          phone_number: currentUserData.phoneNumber,
          cover_letter: currentUserData.coverLetter,
          additional_notes: currentUserData.additionalNotes,
          social_links: socialLinks,
        })
        .eq('email', currentUserData.email)
      
      const addressUpdateResult = await supabase
        .from('applicant_address')
        .update({
          region: currentUserAddress.region,
          cityOrProvince: currentUserAddress.cityOrProvince,
          street_address: currentUserAddress.streetAddress,
          region_code: currentUserAddress.regionCode
        })
        .eq('email', currentUserData.email)


      if (!addressUpdateResult.error && !profileUpdateResult.error) {

      // In case user wants to change resume
       if (currentUserData.resume) {
        const resumeFileExt = (currentUserData.resume.name).split('.').pop()        
        const resumeResult = await supabase
        .storage 
        .from('resume')
        .upload(`public/${user.id}.${resumeFileExt}`, currentUserData.resume, {
          cacheControl: '3600',
          upsert: true
        })

        if (resumeResult.error) {
          Alert(
            "error",
            "Application Submission Failed",
            "Invalid resume file"
          );
        } 
       }
        
        const { data: { user } } = await supabase.auth.getUser()   
        if (user) {
          const applicationResult = await supabase
            .from('job_application')
            .insert({
              applicant_email: currentUserData.email,
              job_id: jobInfo.id,
            })
          
          if (!applicationResult.error) {
            router.push('/pages/explore');
            Alert("success", "Application successful", "Please wait for company response");            
          } else {
            Alert(
              "error",
              "Application Submission Failed",
              "An error has occured"
            );
          }
        }
      } else {
        Alert(
          "error",
          "Application Submission Failed",
          "An error has occured"
        );
      }
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
        additionalNotes: userData.additional_notes,
        socialLinks: userData.social_links
      });

      setSocialLinks(userData.social_links)
    }

    if (userData) {
      setCurrentUserAddress({
        region: userData.region,
        regionCode: userData.regionCode,
        cityOrProvince: userData.cityOrProvince,
        streetAddress: userData.street_address,
      });
    }
  }, [userData]);

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
    console.log(userData)
  }, [userData])

  useEffect(() => {
    if (regionsState.length > 0 && userData) {      
      const region = regionsState.find((region) => region.name === userData.region);
      if (region) {
        findProvince(region.name);
      }
    }
  }, [regionsState, userData]);

  useEffect(() => {
    const fetchCompany = async() => {
      if (id) {
        const { data: jobDetail, error: jobDetailError } = await supabase
        .from("job")
        .select("*")
        .eq("id", id)
        .single();

        if (jobDetail) {             
          const { data: companyData, error: companyDataError } = await supabase
          .from("company")
          .select("*")
          .eq("email", jobDetail.email)
          .single();

          const companyLogo = await supabase
          .storage
          .from('companyLogo')
          .getPublicUrl(`public/${companyData.id}.png`)          

          setJobInfo({
            title: jobDetail.title,
            company: companyData.name,
            image: companyLogo.data.publicUrl,
            id: jobDetail.id
          });        
        }
      }
    }

    fetchCompany();
  }, []);

  return (
    <VerificationCheck>
      <ApplicantOnlyPage>
      <div className="">
        <div className="container flex items-center justify-center ">
          <div className="flex flex-col gap-6 max-w-[800px] w-full px-2 pt-10 pb-[80px]">
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="flex gap-3 items-center">
                <Image
                  src={jobInfo.image}
                  alt="Company logo"
                  width={150}
                  height={150}
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
                  <div className="flex flex-col gap-2 w-full">
                    <FormsLabel text="Last Name" label="lastname" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="e.g. John"
                      name="lastName"
                      onInputHandleChange={handleChange}
                      value={currentUserData["lastName"] || ""}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-start gap-6 ">
                  <div className="flex flex-col gap-2 w-full">
                    <FormsLabel text="Email" label="email" />
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
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <FormsLabel text="Phone Number" label="phoneNumber" />
                    <Input
                      id="phoneNumber"
                      type="text"
                      placeholder="e.g. 09XXXXXXXXX"
                      name="phoneNumber"
                      onInputHandleChange={handleChange}
                      value={currentUserData["phoneNumber"] || ""}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="flex justify-start gap-6 ">
                  <div className="flex flex-col gap-2 w-full">
                    <FormsLabel text="Birthdate" label="birthDate" />
                    <Input
                      id="birthDate"
                      type="date"
                      name="birthDate"
                      onInputHandleChange={handleChange}
                      value={currentUserData["birthDate"] || ""}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <FormsLabel text="Gender" label="gender" />
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
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
              <h1 className="mb-3 text-lg font-medium">Applicant Address</h1>
              <div className="flex justify-between gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="Region" label="region" />
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
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="City/Province" label="cityOrProvince" />
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
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="Street Address" label="streetAddress" />
                  <Input
                    id="streetAddress"
                    type="text"
                    // placeholder="e.g. John"
                    name="streetAddress"
                    onInputHandleChange={handleChange}
                    value={currentUserAddress["streetAddress"] || ""}
                    className="mt-1"
                  ></Input>
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
                    id="coverLetter"
                    name="coverLetter"
                    className="border border-input-border bg-input resize-none min-h-[120px] mt-1"
                    onChange={handleChange}
                    value={currentUserData["coverLetter"] || ""}
                  />
                </div>
                <div className="flex items-center mb-2">
                <FormsLabel text="Resume or Curriculum Vitae" label="resume" />
                <Button variant="default" size="sm" className="ml-auto relative cursor-pointer">
                  Upload new
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 
                    cursor-pointer text-[0]" id="resume" name="resume" accept="application/pdf" onChange={handleChange}/>
                </Button>
                </div>
                <div className="flex justify-end">
                    {currentUserData.resumeName ? `Uploaded File: ${currentUserData.resumeName}` : ""}           
                </div>
                <iframe
                  src={currentUserData['resumeDisplay'] || ""}
                  className="w-full h-[400px] rounded-lg border mb-6"
                ></iframe>
                <div className="flex flex-col gap-2">
                  <FormsLabel text="Additional Notes (Optional)" label="additionalNotes" />
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    className="border border-input-border bg-input resize-none min-h-[120px] mt-1"
                    onChange={handleChange}
                    value={currentUserData["additionalNotes"] || ""}
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

            <Button onClick={handleSubmit} >Submit</Button>
          </div>
        </div>
      </div>
      </ApplicantOnlyPage>
    </VerificationCheck>
  );
};

export default page;
