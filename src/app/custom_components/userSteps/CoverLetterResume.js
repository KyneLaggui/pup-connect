import React, { useContext, useEffect } from "react";
import FormsLabel from "../FormsLabel";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StepperContext } from "../StepperContext";

const CoverLetterResume = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e, name) => {
    if (e && e.target) {
      if (e.target.type === "file") {
        // For file input events
        const { name } = e.target;
        const file = e.target.files[0];
        setUserData({ ...userData, [name]: file });
      } else {
        // For regular input events
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
      }
    } else if (name) {
      // For Select component
      setUserData({ ...userData, [name]: e });
    }
  };

  useEffect(() => {
    if (userData["formsLetter"]) console.log(userData["formsLetter"].name);
  }, [userData]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="mb-2">
        <FormsLabel text="Cover Letter" label="coverLetter" />
        <Textarea
          id="coverLetter"
          name="coverLetter"
          className="border border-input-border bg-input resize-none min-h-[120px] mt-1"
          onChange={handleChange}
          value={userData["coverLetter"] || ""}
        />
      </div>
      <div className="mb-2">
        <FormsLabel text="Resume / Curriculum Vitae" label="formsLetter" />
        <Input
          type="file"
          id="formsLetter"
          name="formsLetter"
          className="text-forms-placeholder mt-1"
          onInputHandleChange={handleChange}
        />
        {/* {userData["formsLetter"] && (
          <p className="mt-2 text-sm text-muted-foreground tracking-wide">
            Selected file: {userData["formsLetter"].name}
          </p>
        )} */}
      </div>
      <div className="mb-2">
        <FormsLabel
          text="Additional notes (optional)"
          label="additionalLetter"
        />
        <Textarea
          id="additionalLetter"
          name="additionalLetter"
          className="border border-input-border bg-input resize-none min-h-[120px] mt-1"
          onChange={handleChange}
          value={userData["additionalLetter"] || ""}
        />
      </div>
    </div>
  );
};

export default CoverLetterResume;
