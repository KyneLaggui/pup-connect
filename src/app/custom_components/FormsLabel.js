import React from "react";
import { Label } from "@/components/ui/label";

const FormsLabel = ({ label, text }) => {
  return (
    <Label
      htmlFor={label}
      className="text-[0.9rem] font-regular text-forms-label font-medium"
    >
      {text}
    </Label>
  );
};

export default FormsLabel;
