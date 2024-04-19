import React from 'react'
import { Input } from "@/components/ui/input"

const FormsInput = ({type, inputName}) => {
  return (
    <Input type={type} placeholder="" name={inputName} className="" />
  )
}

export default FormsInput
