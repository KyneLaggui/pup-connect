import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormsLabel from "../FormsLabel";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { microsoftLogo } from "@assets/index";
import { Button } from "@/components/ui/button";
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useParams, useRouter } from "next/navigation";
import { jobCardInfo } from "../../constants";

const Experience = () => {
  const [socialLinks, setSocialLinks] = useState([""]);
  const [jobInfo, setJobInfo] = useState({
    title: "",
    company: "",
    image: "",
  });

  const params = useParams();

  const addSocialLinkInput = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeSocialLinkInput = (index) => {
    if (socialLinks.length > 1) {
      const newSocialLinks = [...socialLinks];
      newSocialLinks.splice(index, 1);
      setSocialLinks(newSocialLinks);
    }
  };

  const handleSocialLinkInputChange = (index, event) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index] = event.target.value;
    setSocialLinks(newSocialLinks);
  };

  useEffect(() => {
    const designatedJob = jobCardInfo.filter((item) => {
      return parseInt(item.number) === parseInt(params.id);
    });

    // setJobInfo({
    //   title: designatedJob[0].title,
    //   company: designatedJob[0].company,
    //   image: designatedJob[0].image,
    // });
  }, []);

  return (
    <div className="">
      <FormsLabel text="Social links" label="social" />
      <div className="flex flex-col gap-2 mt-2">
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
  );
};

export default Experience;
