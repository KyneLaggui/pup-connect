"use client";

import React, { useState } from "react";
import { dummyUser } from "../constants";
import { Input } from "@/components/ui/input";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LinkIcon from "@mui/icons-material/Link";
import { dummyResume } from "@assets/index";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FormProfile = () => {
  const [userData, setUserData] = useState({
    firstName: dummyUser.firstName,
    middleName: dummyUser.middleName,
    lastName: dummyUser.lastName,
    birthDate: dummyUser.birthDate,
    gender: dummyUser.gender,
    email: dummyUser.email,
    phone: dummyUser.phone,
    region: dummyUser.region,
    province: dummyUser.province,
    city: dummyUser.city,
    barangay: dummyUser.barangay,
    address: dummyUser.address,
    socialLinks: dummyUser.socialLinks,
  });

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

  return (
    <div className="flex-1 rounded-xl p-8 border shadow-md bg-background">
      <h1 className="mb-2 text-lg font-semibold">Basic Information</h1>
      <table className="table-fixed w-full mb-6 border-separate border-spacing-y-2">
        <tbody>
          <tr>
            <td className="w-[140px] text-muted-foreground">First Name:</td>
            <td>
              <Input
                name="firstName"
                variant="default"
                size="sm"
                value={userData["firstName"] || ""}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Middle Name:</td>
            <td>
              <Input
                variant="default"
                size="sm"
                value={userData.middleName}
                onChange={(e) => handleChange(e, "middleName")}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Last Name:</td>
            <td>
              <Input
                variant="default"
                size="sm"
                value={userData.lastName}
                onChange={(e) => handleChange(e, "lastName")}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Birthdate:</td>
            <td>
              <Input
                disabled
                variant="default"
                size="sm"
                value={userData.birthDate}
                onChange={(e) => handleChange(e, "birthDate")}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Gender:</td>
            <td>
              <Input
                variant="default"
                size="sm"
                value={userData.gender}
                onChange={(e) => handleChange(e, "gender")}
              />
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
                disabled
                variant="default"
                size="sm"
                value={userData.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Phone:</td>
            <td>
              <Input
                variant="default"
                size="sm"
                value={userData.phone}
                onChange={(e) => handleChange(e, "phone")}
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
              <Input
                variant="default"
                size="sm"
                value={userData.region}
                onChange={(e) => handleChange(e, "region")}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Province:</td>
            <td>
              <Input
                variant="default"
                size="sm"
                value={userData.province}
                onChange={(e) => handleChange(e, "province")}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">City:</td>
            <td>
              <Input
                variant="default"
                size="sm"
                value={userData.city}
                onChange={(e) => handleChange(e, "city")}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Barangay:</td>
            <td>
              <Input
                variant="default"
                size="sm"
                value={userData.barangay}
                onChange={(e) => handleChange(e, "barangay")}
              />
            </td>
          </tr>
          <tr>
            <td className="text-muted-foreground">Street:</td>
            <td>
              <Input
                variant="default"
                size="sm"
                value={userData.address}
                onChange={(e) => handleChange(e, "address")}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex items-center mb-2">
        <h1 className="text-lg font-semibold">Resume or Curriculum Vitae</h1>
        <Button variant="default" size="sm" className="ml-auto">
          Upload new
        </Button>
      </div>
      <iframe
        src={dummyResume}
        className="w-full h-[400px] rounded-lg border mb-6"
      ></iframe>

      <h1 className="mb-4 text-lg font-semibold">Cover Letter</h1>
      <Textarea
        id="additionalLetter"
        name="additionalLetter"
        className="border border-input-border bg-input resize-none min-h-[120px] mt-1 mb-6 tracking-wide"
      />

      <h1 className="mb-4 text-lg font-semibold">Social Links</h1>
      <div className="w-full mb-6">
        <div className="flex flex-col gap-2 mt-1">
          {dummyUser.socialLinks.map((link, index) => (
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
            className="text-xs text-checkbox-text mt-2"
          >
            Add Social Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormProfile;
