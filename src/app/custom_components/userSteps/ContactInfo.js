// React imports
import React, { useContext, useEffect, useState } from "react";

// Components
import { StepperContext } from "../StepperContext";

import FormsLabel from "../FormsLabel";
import { Input } from "@/components/ui/input";

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
          placeholder="e.g. John"
          name="email"
          onChange={handleChange}
          value={userData["email"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Phone" label="phoneNumber" />
        <Input
          id="phoneNumber"
          type="text"
          placeholder="e.g. John"
          name="phoneNumber"
          onChange={handleChange}
          value={userData["phoneNumber"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Address" label="address" />
        <Input
          id="address"
          type="text"
          placeholder="e.g. John"
          name="address"
          onChange={handleChange}
          value={userData["address"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Social links" label="social" />
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
                onChange={(event) => handleSocialLinkInputChange(index, event)}
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
