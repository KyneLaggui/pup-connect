"use client"

import React, { useEffect } from 'react'

const InputBox = ({type, name, onInputHandleChange}) => {
  
  return (
    <input
        type={type}
        className="flex justify-center items-center gap-4 border-solid border rounded-sm border-buttonColor py-2 px-2 text-s w-full"
        name={name}
        onChange={onInputHandleChange}
        placeholder="E.g. johndoe@email.com"
    />
  )
}

export default InputBox