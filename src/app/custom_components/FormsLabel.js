import React from 'react'
import { Label } from "@/components/ui/label"

const FormsLabel = ({label, text}) => {
  return (
    <Label htmlFor={label}>
       {text} 
    </Label> 
  )
}

export default FormsLabel
