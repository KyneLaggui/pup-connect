import FormsLabel from "@/app/custom_components/FormsLabel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { dummyImage } from "@assets/index";
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { StepperContext } from "../StepperContext";

const BasicInformation = () => {
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
          console.log("Password too short");
        } else if (e.target.value.length > 32) {
          console.log("Password too long");
        }
      } else {
        // For regular input events
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
      }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 200000) {
      console.log("File size exceeds 200KB");
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

      <div className="mb-2">
        <FormsLabel text="About / Description" label="additionalLetter" />
        <Textarea
          id="additionalLetter"
          name="additionalLetter"
          className="border border-input-border bg-input resize-none min-h-[120px] mt-1"
          onInputHandleChange={handleChange}
          value={companyData["additionalLetter"] || ""}
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
