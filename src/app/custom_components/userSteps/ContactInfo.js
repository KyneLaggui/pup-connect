// React imports
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
  const { userData, setUserData } = useContext(StepperContext);
  const [socialLinks, setSocialLinks] = useState(userData.socialLinks || [""]);
  const [regionsState, setRegionsState] = useState([]);
  const [provincesState, setProvincesState] = useState([]);
  const [cityOrMunicipalityState, setCityOrMunicipalityState] = useState([]);
  const [barangaysState, setBarangaysState] = useState([]);

  const handleChange = (e, name) => {
    if (e && e.target) {
      // For regular input events
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    } else if (name) {
      // For Select component
      setUserData({ ...userData, [name]: e });
    }
  };

  const handleLocationChange = (e, name) => {
    if (name == "region") {
      // For Select component
      setUserData({ ...userData, [name]: e });
      findProvince(e.code)
    } else if (name == "province") {
      setUserData({ ...userData, [name]: e });
      findMunicipality(e.code)
    } else if (name == "cityOrMunicipality") {
      setUserData({ ...userData, [name]: e });
      findBarangay(e.code)
    } else if (name == "barangay") {
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

  async function findBarangay(municipalityCode) {
    const response = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${municipalityCode}/barangays.json`);
    const barangays = await response.json();
    const barangaysStorage = barangays.map((barangay) => {
        return {
          name: barangay['name'],
          code: barangay['code']
        }
      })

      setBarangaysState(barangaysStorage)

      barangays.map((barangay) => {
        if (barangay['name'] === userData.barangay) {
          findBarangay(barangay['code'])
        }
      })
  }

  async function findMunicipality(provinceCode) {
    const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}/municipalities.json`);
    const municipalities = await response.json();

    const cityOrMunicipalityStorage = municipalities.map((municipality) => {
      return {
        name: municipality['name'],
        code: municipality['code']
      }
    })

    setCityOrMunicipalityState(cityOrMunicipalityStorage)

    municipalities.map((municipality) => {
      if (municipality['name'] === userData.cityOrMunicipality) {
        findBarangay(municipality['code'])
      }
    })
  }

  async function findProvince(regionCode) {
    const response = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces.json`);
    const provinces = await response.json();
    const provincesStorage = provinces.map((province) => {
      return {
        name: province['name'],
        code: province['code']
      }
    })

    setProvincesState(provincesStorage)

    provinces.map((province) => {
      if (province['name'] === userData.province) {
        findProvince(province['code'])
      }
    })
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

    regions.map((region) => {
      if (region['name'] === userData.region) {
        findProvince(region['code'])
      }
    })
    // for (let i = 0; i < regions.length; i++) {
    //   if (regions[i]['name'] === userData.region) {
    //     findProvince(regions[i]['code'])
    //   }
    // }
  }

  useEffect(() => {
    generateRegions();
  }, []) 

  // regionSelection.addEventListener('change', () => findProvince(regionSelection[regionSelection.selectedIndex].code));

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full mb-2">
        <FormsLabel text="Email" label="email" />
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
        <FormsLabel text="Phone" label="phoneNumber" />
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
          <FormsLabel text="Region" label="region" />
          <Select
            id="region"
            name="region"
            onValueChange={(value) => {
              handleLocationChange(value, "region");
            }}
            defaultValue={userData["region"] || ""}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Please select..." />
            </SelectTrigger>
            <SelectContent>
              {
                regionsState.map((region, i) => <SelectItem value={region} key={i}>{region.name}</SelectItem> )
              }
              <SelectItem value="prefer-no-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full mb-2">
          <FormsLabel text="Province" label="province" />
          <Select
            id="province"
            name="province"
            onValueChange={(value) => {
              handleLocationChange(value, "province");
            }}
            defaultValue={userData["province"] || ""}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Please select..." />
            </SelectTrigger>
            <SelectContent>
              {
                provincesState.map((province, i) => <SelectItem value={province} key={i}>{province.name}</SelectItem>)
              }
              <SelectItem value="prefer-no-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full mb-2">
          <FormsLabel text="City/Municipality" label="cityOrMunicipality" />
          <Select
            id="cityOrMunicipality"
            name="cityOrMunicipality"
            onValueChange={(value) => {
              handleLocationChange(value, "cityOrMunicipality");
            }}
            defaultValue={userData["cityOrMunicipality"] || ""}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Please select..." />
            </SelectTrigger>
            <SelectContent>
              {
                cityOrMunicipalityState.map((cityOrMunicipality, i) => <SelectItem value={cityOrMunicipality} key={i}>{cityOrMunicipality.name}</SelectItem>)
              }
              <SelectItem value="prefer-no-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full mb-2">
          <FormsLabel text="Barangay" label="barangay" />
          <Select
            id="barangay"
            name="barangay"
            onValueChange={(value) => {
              handleLocationChange(value, "barangay");
            }}
            defaultValue={userData["barangay"] || ""}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Please select..." />
            </SelectTrigger>
            <SelectContent>
              {
                barangaysState.map((barangay, i) => <SelectItem value={barangay} key={i}>{barangay.name}</SelectItem>)
              }
              <SelectItem value="prefer-no-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full mb-2 col-span-2">
          <FormsLabel
            text="Street address (Building number & Street name)"
            label="streetAddress"
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
