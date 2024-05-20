import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useContext, useEffect } from "react";
import FormsLabel from "@/app/custom_components/FormsLabel";
import { StepperContext } from "../StepperContext";

const BasicInformation = () => {
  const { userData, setUserData } = useContext(StepperContext);

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

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full mb-2">
        <FormsLabel text="First name" label="firstName" />
        <Input
          id="firstName"
          type="text"
          placeholder="e.g. John"
          name="firstName"
          onChange={handleChange}
          value={userData["firstName"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Middle name" label="middleName" />
        <Input
          id="middleName"
          type="text"
          placeholder="e.g. Middle"
          name="middleName"
          onChange={handleChange}
          value={userData["middleName"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Last name" label="lastName" />
        <Input
          id="lastName"
          type="text"
          placeholder="e.g. Doe"
          name="lastName"
          onChange={handleChange}
          value={userData["lastName"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Birthdate" label="birthDate" />
        <Input
          id="birthDate"
          type="date"
          // placeholder="e.g. Doe"
          name="birthDate"
          onChange={handleChange}
          value={userData["birthDate"] || ""}
          className="mt-1"
        ></Input>
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Gender" label="gender" />
        <Select
          id="gender"
          name="gender"
          onValueChange={(value) => {
            handleChange(value, "gender");
          }}
          defaultValue={userData["gender"] || ""}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Please select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="others">Others</SelectItem>
            <SelectItem value="prefer-no-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasicInformation;
