"use client"
import FormsLabel from '@/app/custom_components/FormsLabel';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LinkIcon } from 'lucide-react';
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import Tags from "../../../custom_components/companySteps/Tags"
import { companyTags } from "../../../constants";
import { Tag } from '@/app/custom_components/Tag';

const page = () => {
    const [qualifications, setQualifications] = useState([""]);
    const [benefits, setBenefits] = useState([""]);
    const [attachments, setAttachments] = useState([""]);
    const [selectedTags, setSelectedTags] = useState([]);
    

    const handleTagClick = (tag) => {
        setSelectedTags((prevTags) => {
          const updatedTags = prevTags.includes(tag)
            ? prevTags.filter((t) => t !== tag)
            : [...prevTags, tag];
          
          return updatedTags;
        });
      };


    const addQualificationInput = () => {
        setQualifications([...qualifications, ""]);
        console.log("Added Qualification Input:", qualifications);
    };

    const removeQualificationInput = (index) => {
        if (qualifications.length > 1) {
          const newQualifications = [...qualifications];
          newQualifications.splice(index, 1);
          setQualifications(newQualifications);
        }
    };

    const handleQualificationInputChange = (index, event) => {
        const newQualifications = [...qualifications];
        newQualifications[index] = event.target.value;
        setQualifications(newQualifications);
    };

    const addBenefitInput = () => {
        setBenefits([...benefits, ""]);
    };

    const removeBenefitInput = (index) => {
        if (benefits.length > 1) {
          const newBenefits = [...benefits];
          newBenefits.splice(index, 1);
          setBenefits(newBenefits);
        }
    };

    const handleBenefitInputChange = (index, event) => {
        const newBenefits = [...benefits];
        newBenefits[index] = event.target.value;
        setBenefits(newBenefits);
    };

    const addAttachmentInput = () => {
        setAttachments([...attachments, ""]);
    };

    const removeAttachmentInput = (index) => {
        if (attachments.length > 1) {
          const newAttachments = [...attachments];
          newAttachments.splice(index, 1);
          setAttachments(newAttachments);
        }
    };

    const handleAttachmentInputChange = (index, event) => {
        const newAttachments = [...attachments];
        newAttachments[index] = event.target.value;
        setAttachments(newAttachments);
    };

  return (
    <div className="">
      <div className="container flex items-center justify-center ">
        <div className="flex flex-col gap-6 max-w-[800px] w-full px-2 pt-10 pb-[80px]">
          <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
            <h1 className="mb-3 text-lg font-medium">Job Information</h1>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="Job Title" label="firstname" />
                  <Input type="text" name="firstName" />
                </div>
                
              </div>

              <div className="flex justify-start gap-6 ">
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="Job Mode" label="jobMode" />
                  <Select
                    id="jobMode"
                    name="jobMode"
                    >
                    <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Please select..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onSite">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <FormsLabel text="Job Type" label="jobType" />
                  <Select
                    id="jobType"
                    name="jobType"
                    >
                    <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Please select..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="partTime">Part-Time</SelectItem>
                        <SelectItem value="fullTime">Full-Time</SelectItem>
                        
                    </SelectContent>
                    </Select>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <FormsLabel text="Location (Oy lagyan mo to API)" label="location" />
                <Input type="text" name="location" value="Gawin mo tong API"/>
              </div>
              <div className='flex flex-col gap-2'>
                <FormsLabel text="Salary (Optional)" label="salary" />
                <Input type="text" name="salary" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
                <h1 className="mb-3 text-lg font-medium">Job Information</h1>
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-2">
                        <FormsLabel text="About this Role" label="aboutRole" />
                        <Textarea className="border border-input-border bg-input resize-none min-h-[120px]" name="aboutRole" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormsLabel text="Qualifications" label="qualifications" />
                        {qualifications.map((qualification, index) => (
                            <div key={index} className="flex items-center rounded-md border border-input-border bg-input">
                                <div className="p-1 h-full border-r border-muted">
                                    <LinkIcon className="rotate-90 w-[20px] h-[20px] text-drawer-icon" />
                                </div>
                                <Input
                                    type="text"
                                    value={qualification}
                                    onInputHandleChange={(event) => handleQualificationInputChange(index, event)}
                                    name={`qualification-${index}`}
                                    className="border-0"
                                />
                                <div className="p-2">
                                    <RemoveCircleIcon
                                        className="w-[15px] h-[15px] text-drawer-icon"
                                        onClick={() => removeQualificationInput(index)}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button onClick={addQualificationInput}>Add Qualifications</Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormsLabel text="Benefits" label="benefits" />
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center rounded-md border border-input-border bg-input">
                                <div className="p-1 h-full border-r border-muted">
                                    <LinkIcon className="rotate-90 w-[20px] h-[20px] text-drawer-icon" />
                                </div>
                                <Input
                                    type="text"
                                    value={benefit}
                                    onInputHandleChange={(event) => handleBenefitInputChange(index, event)}
                                    name={`benefit-${index}`}
                                    className="border-0"
                                />
                                <div className="p-2">
                                    <RemoveCircleIcon
                                        className="w-[15px] h-[15px] text-drawer-icon"
                                        onClick={() => removeBenefitInput(index)}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button onClick={addBenefitInput}>Add Benefits</Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormsLabel text="Attachments" label="attachments" />
                        {attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center rounded-md border border-input-border bg-input">
                                <div className="p-1 h-full border-r border-muted">
                                    <LinkIcon className="rotate-90 w-[20px] h-[20px] text-drawer-icon" />
                                </div>
                                <Input
                                    type="text"
                                    value={attachment}
                                    onInputHandleChange={(event) => handleAttachmentInputChange(index, event)}
                                    name={`attachment-${index}`}
                                    className="border-0"
                                />
                                <div className="p-2">
                                    <RemoveCircleIcon
                                        className="w-[15px] h-[15px] text-drawer-icon"
                                        onClick={() => removeAttachmentInput(index)}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button onClick={addAttachmentInput}>Add Attachments</Button>
                    </div>
                </div>
            </div>

          <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
            <h1 className="mb-3 text-lg font-medium">Tags</h1>
            <div className="flex flex-col items-center">
                
                <div
                    className={`flex flex-wrap gap-3 justify-center mt-8 transition-all duration-500 ease-in-out`}
                >
                    {companyTags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Tag
                        variant="static"
                        size="default"
                        state={selectedTags.includes(tag) ? "selected" : "default"}
                        onClick={() => handleTagClick(tag)}
                        className="cursor-pointer"
                        >
                        {tag}
                        </Tag>
                    </div>
                    ))}
                </div>
                
            </div>
          </div>    


          

          <Button>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default page