// React imports
import React, { useContext, useEffect, useState } from "react";

// Components
import { StepperContext } from "../StepperContext";

import FormsLabel from "../FormsLabel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Icons

const ContactInfo = () => {
  const { companyData, setCompanyData } = useContext(StepperContext);

  const handleChange = (e, name) => {
    if (e && e.target) {
      // For regular input events
      const { name, value } = e.target;
      setCompanyData({ ...companyData, [name]: value });
    } else if (name) {
      // For Select component
      setCompanyData({ ...companyData, [name]: e });
    }
  };

  // useEffect(() => {
  //   console.log(companyData);
  //   console.log(socialLinks);
  // }, [companyData, socialLinks]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full mb-2">
        <FormsLabel text="Status" label="status" />
        <Input
          disabled
          id="status"
          type="text"
          placeholder="e.g. johndoe@mail.com"
          name="status"
          onInputHandleChange={handleChange}
          value={companyData["status"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Email" label="email" />
        <Input
          disabled
          id="email"
          type="email"
          placeholder="e.g. johndoe@mail.com"
          name="email"
          onInputHandleChange={handleChange}
          value={companyData["email"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Password" label="password" />
        <Input
          id="password"
          type="password"
          placeholder="********"
          name="password"
          onInputHandleChange={handleChange}
          value={companyData["password"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Confirm Password" label="confirmPasword" />
        <Input
          id="confirmPasword"
          type="password"
          placeholder="********"
          name="confirmPasword"
          onInputHandleChange={handleChange}
          value={companyData["confirmPasword"] || ""}
          className="mt-1"
        ></Input>
      </div>
    </div>
  );
};

export default ContactInfo;
