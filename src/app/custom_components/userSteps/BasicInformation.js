import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useContext } from "react";
import FormsLabel from "@/app/custom_components/FormsLabel";
import { StepperContext } from "../StepperContext";

const BasicInformation = () => {
  const { userData, setUserData, invalidFields } = useContext(StepperContext);

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

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full mb-2">
        <FormsLabel text="First name" label="firstName" isInvalid={invalidFields.firstName} />
        <Input
          id="firstName"
          type="text"
          placeholder="e.g. John"
          name="firstName"
          onInputHandleChange={handleChange}
          value={userData["firstName"] || ""}
          className="mt-1"
        />
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Middle name (optional)" label="middleName" />
        <Input
          id="middleName"
          type="text"
          placeholder="e.g. Middle"
          name="middleName"
          onInputHandleChange={handleChange}
          value={userData["middleName"] || ""}
          className="mt-1"
        />
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Last name" label="lastName" isInvalid={invalidFields.lastName} />
        <Input
          id="lastName"
          type="text"
          placeholder="e.g. Doe"
          name="lastName"
          onInputHandleChange={handleChange}
          value={userData["lastName"] || ""}
          className="mt-1"
        />
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Birthdate" label="birthDate" isInvalid={invalidFields.birthDate} />
        <Input
          id="birthDate"
          type="date"
          name="birthDate"
          onInputHandleChange={handleChange}
          value={userData["birthDate"] || ""}
          className="mt-1"
        />
      </div>

      <div className="w-full mb-2">
        <FormsLabel text="Gender" label="gender" isInvalid={invalidFields.gender} />
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
