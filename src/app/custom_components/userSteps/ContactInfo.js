import React, { useContext, useEffect, useState } from "react";

// Components
import { StepperContext } from "../StepperContext";

import FormsLabel from "../FormsLabel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icons
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ContactInfo = () => {
  const { userData, setUserData, invalidFields } = useContext(StepperContext);
  const [socialLinks, setSocialLinks] = useState(userData.socialLinks || [""]);
  const [regionsState, setRegionsState] = useState([]);
  const [provinceCityState, setProvincesCityState] = useState([]);

  const handleChange = (e, name) => {
    if (e && e.target) {
      // For regular input events
      const { name, value } = e.target;
       // Apply phone number formatting
       if (name === "phoneNumber") {
        let formattedValue = formatPhoneNumber(value);
        setUserData({ ...userData, [name]: formattedValue });
      } else {
        setUserData({ ...userData, [name]: value });
      }

    } else if (name) {
      // For Select component
      setUserData({ ...userData, [name]: e });
    }
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

  const handleLocationChange = async (e, name) => {
    if (name === "region") {
      // For Select component    
      await findProvince(e); // Ensure that this is awaited
      setUserData({ ...userData, [name]: e, cityOrProvince: "" }); 
    } else if (name === "cityOrProvince") {      
      setUserData({ ...userData, [name]: e });
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
      setUserData({ ...userData, socialLinks: newSocialLinks });
    }
  };

  const handleSocialLinkInputChange = (index, event) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index] = event.target.value;
    setSocialLinks(newSocialLinks);
    setUserData({ ...userData, socialLinks: newSocialLinks });
  };

  async function findProvince(regionName) {
    const region = regionsState.find(region => region.name === regionName);
    setUserData({
      ...userData,
      regionCode: region.code
    })
    const response = await fetch(`https://psgc.gitlab.io/api/regions/${region.code}/provinces.json`);
    const provinces = await response.json();
    const secondResponse = await fetch(`https://psgc.gitlab.io/api/regions/${region.code}/cities.json`);
    const cities = await secondResponse.json();
    const citiesStorage = cities.map((city) => {
      return {
        name: city['name'],
        code: city['code']
      }
    })

    const provincesStorage = provinces.map((province) => {
      return {
        name: province['name'],
        code: province['code']
      }
    })

    let cityAndProvince = provincesStorage.concat(citiesStorage)

    cityAndProvince = cityAndProvince.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    setProvincesCityState(cityAndProvince)
  }

  async function generateRegions() {
    const response = await fetch(`https://psgc.gitlab.io/api/regions.json`);
    const regions = await response.json();
    const regionsStorage = regions.map((region) => {
      return {
        name: region['name'],
        code: region['code']
      }
    })

    setRegionsState(regionsStorage)    
  }

  useEffect(() => {
    const findRegions = async() => {
      await generateRegions()
    }
    findRegions()
  }, []) 

  useEffect(() => {
    if (regionsState !== []) {
      regionsState.map((region) => {
        if (region['name'] === userData.region) {
          findProvince(region['name'])
        }
      })
    }
  }, [regionsState])

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full mb-2">
        <FormsLabel text="Email" label="email" isInvalid={invalidFields.email} />
        <Input
          id="email"
          type="text"
          placeholder="e.g. johndoe@mail.com"
          name="email"
          onInputHandleChange={handleChange}
          value={userData["email"] || ""}
          className="mt-1"
          disabled
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Phone" label="phoneNumber" isInvalid={invalidFields.phoneNumber}  />
        <Input
          id="phoneNumber"
          type="text"
          placeholder="e.g. 09XXXXXXXXX"
          name="phoneNumber"
          onInputHandleChange={handleChange}
          value={userData["phoneNumber"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <h3 className="text-base font-semibold">Address</h3>
        </div>
        <div className="w-full mb-2">
          <FormsLabel text="Region" label="region" isInvalid={invalidFields.region} />
          <Select
            id="region"
            name="region"
            onValueChange={(value) => {
              handleLocationChange(value, "region");
            }}
            value={userData.region || ""}
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
        <div className="w-full mb-2">
          <FormsLabel text="City/Province" label="province" isInvalid={invalidFields.cityOrProvince}  />
          <Select
            id="cityOrProvince"
            name="cityOrProvince"
            onValueChange={(value) => {
              handleLocationChange(value, "cityOrProvince");
            }}
            value={userData["cityOrProvince"] || ""}
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
        <div className="w-full mb-2 col-span-2">
          <FormsLabel
            text="Street address (Building number & Street name)"
            label="streetAddress"
            isInvalid={invalidFields.streetAddress} 
          />
          <Input
            id="streetAddress"
            type="text"
            // placeholder="e.g. John"
            name="streetAddress"
            onInputHandleChange={handleChange}
            value={userData["streetAddress"] || ""}
            className="mt-1"
          ></Input>
        </div>
      </div>

      <Separator />

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
                onInputHandleChange={(event) => handleSocialLinkInputChange(index, event)}
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

export default ContactInfo;
