import React, { useContext, useEffect, useState } from "react";
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
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ContactInfo = () => {
  const { userData, setUserData, invalidFields } = useContext(StepperContext);
  const [socialLinks, setSocialLinks] = useState(userData.socialLinks || [""]);
  const [regionsState, setRegionsState] = useState([]);
  const [provinceCityState, setProvincesCityState] = useState([]);

  const handleChange = (e, name) => {
    if (e && e.target) {
      const { name, value } = e.target;
      if (name === "phoneNumber") {
        let formattedValue = formatPhoneNumber(value);
        setUserData((prevUserData) => ({ ...prevUserData, [name]: formattedValue }));
      } else {
        setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
      }
    } else if (name) {
      setUserData((prevUserData) => ({ ...prevUserData, [name]: e }));
    }
  };

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, "");
    if (!value.startsWith("09")) {
      value = "09" + value.slice(0, 9);
    } else if (value.length > 11) {
      value = value.slice(0, 11);
    }
    return value;
  };

  const handleLocationChange = async (e, name) => {
    if (name === "region") {
      await findProvince(e);
      setUserData((prevUserData) => ({ ...prevUserData, [name]: e, cityOrProvince: "" }));
    } else if (name === "cityOrProvince") {
      console.log(userData)
      setUserData((prevUserData) => ({ ...prevUserData, [name]: e }));
    }
  };

  const addSocialLinkInput = () => {
    setSocialLinks((prevLinks) => [...prevLinks, ""]);
  };

  const removeSocialLinkInput = (index) => {
    setSocialLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.splice(index, 1);
      setUserData((prevUserData) => ({ ...prevUserData, socialLinks: newLinks }));
      return newLinks;
    });
  };

  const handleSocialLinkInputChange = (index, event) => {
    setSocialLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[index] = event.target.value;
      setUserData((prevUserData) => ({ ...prevUserData, socialLinks: newLinks }));
      return newLinks;
    });
  };

  async function findProvince(regionName) {
    const region = regionsState.find((region) => region.name === regionName);
    setUserData((prevUserData) => ({ ...prevUserData, regionCode: region.code }));

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
    if (regionsState.length > 0) {
      const region = regionsState.find((region) => region.name === userData.region);
      if (region) {
        findProvince(region.name);
      }
    }
  }, [regionsState]);

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
          value={userData.email || ""}
          className="mt-1"
          disabled
        ></Input>
      </div>
      <div className="w-full mb-2">
        <FormsLabel text="Phone" label="phoneNumber" isInvalid={invalidFields.phoneNumber} />
        <Input
          id="phoneNumber"
          type="text"
          placeholder="e.g. 09XXXXXXXXX"
          name="phoneNumber"
          onInputHandleChange={handleChange}
          value={userData.phoneNumber || ""}
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
            onValueChange={async (value) => {
              await handleLocationChange(value, "region");
            }}
            value={userData.region || ""}
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
        </div>
        <div className="w-full mb-2">
          <FormsLabel text="City/Province" label="province" isInvalid={invalidFields.cityOrProvince} />
          <Select
            id="cityOrProvince"
            name="cityOrProvince"
            onValueChange={async (value) => {
              await handleLocationChange(value, "cityOrProvince");
            }}
            value={userData.cityOrProvince || ""}
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
            name="streetAddress"
            onInputHandleChange={handleChange}
            value={userData.streetAddress || ""}
            className="mt-1"
          ></Input>
        </div>
      </div>
      <Separator />
      <div className="w-full mb-2">
        <div className="mb-3">
          <h3 className="text-base font-semibold">Social links</h3>
          <p className="text-sm text-muted-foreground">Add your all social URLs.</p>
        </div>
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
    </div>
  );
};

export default ContactInfo;
