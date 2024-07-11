import FormsLabel from "@/app/custom_components/FormsLabel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { dummyImage } from "@assets/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { CompanyContext } from "../StepperContext";

const BasicInformation = () => {
  const { companyData, setCompanyData, invalidFields } = useContext(CompanyContext);
  const imageInputRef = useRef(null);

  const [regionsState, setRegionsState] = useState([]);
  const [provinceCityState, setProvincesCityState] = useState([]);
  
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
      } else {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
      }
    } else if (name) {
      // For Select inputs
      setCompanyData({ ...companyData, [name]: e });
    }
  };

  // const handleChange = (e, name) => {
  //   if (e && e.target) {
  //     if (e.target.type === "file") {
  //       // For file input events
  //       const { name } = e.target;
  //       const file = e.target.files[0];
  //       setCompanyData({ ...companyData, [name]: file });
  //     } else if (e.target.type === "password") {
  //       // For password input events
  //       if (e.target.value.length < 8) {
  //         console.log("Password too short");
  //       } else if (e.target.value.length > 32) {
  //         console.log("Password too long");
  //       }
  //     } else {
  //       // For regular input events
  //       const { name, value } = e.target;
  //       setCompanyData({ ...companyData, [name]: value });
  //     }
  //   }
  // };

  const handleLocationChange = async (e, name) => {
    if (name === "region") {
      await findProvince(e);
      setCompanyData((prevCompanyData) => ({ ...prevCompanyData, [name]: e, cityOrProvince: "" }));
    } else if (name === "cityOrProvince") {
      console.log(companyData)
      setCompanyData((prevCompanyData) => ({ ...prevCompanyData, [name]: e }));
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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file.size > 200000) {
  //     console.log("File size exceeds 200KB");
  //     return;
  //   } else {
  //     setCompanyData({ ...companyData, logo: file });
  //     console.log(file);
  //     console.log(file.size);
  //   }
  // };

  async function findProvince(regionName) {
    const region = regionsState.find((region) => region.name === regionName);
    setCompanyData((prevUserData) => ({ ...prevUserData, regionCode: region.code }));

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
      const region = regionsState.find((region) => region.name === companyData.region);
      if (region) {
        findProvince(region.name);
      }
    }
  }, [regionsState]);

  useEffect(() => {
    console.log(companyData)
  }, [companyData])

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
      <FormsLabel text="Company Logo (PNG)" label="logo" isInvalid={invalidFields.resume} />
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
        <FormsLabel text="Company Name" label="name" isInvalid={invalidFields.name} />
        <Input
          id="name"
          type="text"
          placeholder="e.g. John"
          name="name"
          onInputHandleChange={handleChange}
          value={companyData["name"] || ""}
          className="mt-1"
        />
      </div>

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
            value={companyData.region || ""}
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
            value={companyData.cityOrProvince || ""}
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
            value={companyData.streetAddress || ""}
            className="mt-1"
          ></Input>
        </div>
      </div>

      <div className="mb-2">
        <FormsLabel text="About / Description" label="description" />
        <Textarea
          id="description"
          name="description"
          className="border border-input-border bg-input resize-none min-h-[120px] mt-1"
          onChange={handleChange}
          value={companyData["description"] || ""}
        />
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
