// React imports
import React, { useContext, useEffect, useState } from "react";

// Components
import { StepperContext } from "../StepperContext";

import FormsLabel from "../FormsLabel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Icons
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ContactInfo = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [socialLinks, setSocialLinks] = useState(userData.socialLinks || [""]);

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

  useEffect(() => {
    console.log(userData);
    console.log(socialLinks);
  }, [userData, socialLinks]);

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
          <Input
            id="region"
            type="text"
            // placeholder="e.g. John"
            name="region"
            onInputHandleChange={handleChange}
            value={userData["region"] || ""}
            className="mt-1"
          ></Input>
        </div>
        <div className="w-full mb-2">
          <FormsLabel text="Province" label="province" />
          <Input
            id="province"
            type="text"
            // placeholder="e.g. John"
            name="province"
            onInputHandleChange={handleChange}
            value={userData["province"] || ""}
            className="mt-1"
          ></Input>
        </div>
        <div className="w-full mb-2">
          <FormsLabel text="City / Municipality" label="city" />
          <Input
            id="city"
            type="text"
            // placeholder="e.g. John"
            name="city"
            onInputHandleChange={handleChange}
            value={userData["city"] || ""}
            className="mt-1"
          ></Input>
        </div>
        <div className="w-full mb-2">
          <FormsLabel text="Barangay" label="barangay" />
          <Input
            id="barangay"
            type="text"
            // placeholder="e.g. John"
            name="barangay"
            onInputHandleChange={handleChange}
            value={userData["barangay"] || ""}
            className="mt-1"
          ></Input>
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
