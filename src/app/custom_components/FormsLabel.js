import React from "react";
import { Label } from "@/components/ui/label";

const FormsLabel = ({ label, text, isInvalid }) => {
  return (
    <Label
      htmlFor={label}
      className="text-[0.9rem] font-regular text-forms-label font-medium flex items-center"
    >
      {text}
      {isInvalid && <span className="text-red-500 ml-1">⚠</span>}
    </Label>
  );
};

export default FormsLabel;
