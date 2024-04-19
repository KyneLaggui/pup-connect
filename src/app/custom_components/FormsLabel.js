import React from 'react'
import { Label } from "@/components/ui/label"

const FormsLabel = ({label, text}) => {
  return (
    <Label htmlFor={label} className="text-sm font-regular text-forms-label font-normal">
       {text} 
    </Label> 
  )
}

export default FormsLabel
