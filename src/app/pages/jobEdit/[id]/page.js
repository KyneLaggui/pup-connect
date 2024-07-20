"use client"
import FormsLabel from '@/app/custom_components/FormsLabel';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { companyTags } from "../../../constants";
import { Tag } from '@/app/custom_components/Tag';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { supabase } from '@/utils/supabase/client';
import FetchUserProfile from '@/app/custom_hooks/fetchUserProfile';
import VerificationCheck from "@/app/layouts/VerificationCheck";
import { useParams, useRouter } from 'next/navigation';
import { Alert } from "@/app/custom_components/Alert";



const page = () => {
    const [qualifications, setQualifications] = useState([""]);
    const [benefits, setBenefits] = useState([""]);
    const [attachments, setAttachments] = useState([null]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [currentJobData, setCurrentJobData] = useState({
      title: "",
      mode: "",
      type: "",
      salary: null,
      role: "",
      email: ""
    })
    const { id } = useParams()
    const { userData } = FetchUserProfile();
    const router = useRouter();

    const handleChange = (e, name) => {
      if (e && e.target) {
          if (e.target.type === "file") {
              const { name, files } = e.target;
              const file = files[0];
              const index = parseInt(name.split('-')[1]);
              const newAttachments = [...attachments];
              newAttachments[index] = file;
              setAttachments(newAttachments);
          } else {
              const { name, value } = e.target;
              setCurrentJobData({ ...currentJobData, [name]: value });
          }
      } else if (name) {
        setCurrentJobData({ ...currentJobData, [name]: e });
      }
    };

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
        if (attachments.length < 4) {
          setAttachments([...attachments, null]);
        }
    };

    const removeAttachmentInput = (index) => {
        if (attachments.length > 1) {
          const newAttachments = [...attachments];
          newAttachments.splice(index, 1);
          setAttachments(newAttachments);
        }
    };

    const handleSubmit = async() => {
        // Insert the job data first to get the job ID
        const { data: jobDataResult, error: jobDataError } = await supabase
          .from('job')
          .update({
            title: currentJobData.title,
            mode: currentJobData.mode,
            type: currentJobData.type,
            salary: currentJobData.salary,
            role: currentJobData.role,
            qualifications: qualifications,
            benefits: benefits,
            tags: selectedTags,
            email: currentJobData.email,
          })
          .eq('id', id); // Assuming 'id' is the primary key
          
      
        if (jobDataError) {
          console.log(jobDataError)
          Alert(
            "error",
            "Job Editing Failed",
            "An error has occured"
          );
          return;
        } else {
          Alert("success", "Job Edit Successful", "Job details edited successfully!");
        }
      
        const folderName = `${id}`;
        const attachmentURLs = [];
      
        // if (attachments) {
        //   // Upload attachments using the job ID as the folder name
        //   const uploadPromises = attachments.map(async (attachment) => {
        //     if (attachment) {
        //       const { data, error } = await supabase.storage
        //         .from('jobAttachments')
        //         .upload(`${folderName}/${attachment.name}`, attachment);
  
        //       if (error) {
        //         console.error('Error uploading attachment:', error);
        //         throw error;
        //       }
        //     }
        //   });

        //   try {
        //     // Wait for all upload promises to complete
        //     await Promise.all(uploadPromises);
        //     router.push('/pages/explore')
        //     // Perform the next steps here if all uploads are successful
        //   } catch (error) {
        //     console.error('One or more attachments failed to upload:', error);
        //     // Handle the error appropriately
        //   }
        // }
      };
      

    useEffect(() => {
        if (id) {
            const fetchJobDetails = async() => {
                const { data } = await supabase
                    .from('job')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (data) {
                  setCurrentJobData({
                    title: data.title,
                    mode: data.mode,
                    type: data.type,
                    salary:  data.salary,
                    role: data.role,
                    email: data.email,
                  }) 

                  setQualifications(data.qualifications)
                  setBenefits(data.benefits)
                  setSelectedTags(data.tags)
                  
                const folderName = `${id}`;

                 const jobAttachments = await supabase.storage
                  .from("jobAttachments")
                  .list(folderName);
                
                const attachmentsPromises = jobAttachments['data'].map(async (file) => {
                  const { data: fileData, error: downloadError } = await supabase.storage
                    .from('jobAttachments')
                    .download(`${folderName}/${file.name}`);

                  if (downloadError) {
                    console.error('Error downloading file:', downloadError);
                    return null;
                  }
                  
                  return {
                    name: file.name,
                    file: new File([fileData], file.name, {
                      type: fileData.type,
                    })
                  }                          
                });
                
                const attachmentsData = await Promise.all(attachmentsPromises);
                setAttachments(attachmentsData.filter((attachment) => attachment !== null));
              }                 
            }

            fetchJobDetails()
        }
       
    }, [userData, id])

  return (
    <VerificationCheck>
      <div className="">
            <div className="container flex items-center justify-center ">
              <div className="flex flex-col gap-6 max-w-[800px] w-full px-2 pt-10 pb-[80px]">
                <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
                  <h1 className="mb-3 text-lg font-medium">Job Information</h1>
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between gap-6">
                      <div className="flex flex-col gap-2 w-full">
                        <FormsLabel text="Job Title" label="title" />
                        <Input type="text" name="title" onInputHandleChange={handleChange} value={currentJobData['title'] || ""}/>
                      </div>
                      
                    </div>

                    <div className="flex justify-start gap-6 ">
                      <div className="flex flex-col gap-2 w-full">
                        <FormsLabel text="Job Mode" label="mode" />
                        <Select
                          id="mode"
                          name="mode"
                          onValueChange={(value) => {
                            handleChange(value, "mode");
                          }}
                          defaultValue={currentJobData["mode"] || ""}     
                          value={currentJobData["mode"] || ""}                     
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
                        <FormsLabel text="Job Type" label="type" />
                        <Select
                          id="type"
                          name="type"
                          onValueChange={(value) => {
                            handleChange(value, "type");
                          }}
                          defaultValue={currentJobData["type"] || ""}
                          value={currentJobData["type"] || ""}      
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
                      <FormsLabel text="Salary (Optional)" label="salary" />
                      <Input type="text" name="salary" onInputHandleChange={handleChange} value={currentJobData['salary'] || ""}/>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-5 border border-checkbox-border rounded-md">
                      <h1 className="mb-3 text-lg font-medium">Job Information</h1>
                      <div className="flex flex-col gap-6 w-full">
                          <div className="flex flex-col gap-2">
                              <FormsLabel text="About this Role" label="role" />
                              <Textarea className="border border-input-border bg-input resize-none min-h-[120px]" 
                              name="role" onChange={handleChange}  value={currentJobData['role'] || ""}/>
                          </div>
                          <div className="flex flex-col gap-2">
                              <FormsLabel text="Qualifications" label="qualifications" />
                              {qualifications.map((qualification, index) => (
                                  <div key={index} className="flex items-center rounded-md border border-input-border bg-input">
                                      <div className="p-1 h-full border-r border-muted">
                                          <WorkOutlineIcon className="w-[20px] h-[20px] text-drawer-icon" />
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
                                              className="w-[15px] h-[15px] text-drawer-icon cursor-pointer"
                                              onClick={() => removeQualificationInput(index)}
                                          />
                                      </div>
                                  </div>
                              ))}
                              <Button variant="outline" onClick={addQualificationInput}>Add Qualifications</Button>
                          </div>
                          <div className="flex flex-col gap-2">
                              <FormsLabel text="Benefits" label="benefits" />
                              {benefits.map((benefit, index) => (
                                  <div key={index} className="flex items-center rounded-md border border-input-border bg-input">
                                      <div className="p-1 h-full border-r border-muted">
                                          <HandshakeOutlinedIcon className="w-[20px] h-[20px] text-drawer-icon" />
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
                                              className="w-[15px] h-[15px] text-drawer-icon cursor-pointer"
                                              onClick={() => removeBenefitInput(index)}
                                          />
                                      </div>
                                  </div>
                              ))}
                              <Button variant="outline" onClick={addBenefitInput}>Add Benefits</Button>
                          </div>
                          <div className="flex flex-col gap-2">
                              <FormsLabel text="Attachments" label="attachments" />
                              {attachments && attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center rounded-md border border-input-border bg-input">
                                      <div className="p-1 h-full border-r border-muted">
                                          <FolderOutlinedIcon className="w-[20px] h-[20px] text-drawer-icon" />
                                      </div>           
                                      {
                                        attachment && (
                                        //   <Input
                                        //   type="file"
                                        //   accept="image/*"
                                        //   onInputHandleChange={(event) => handleChange(event, `attachment-${index}`)}
                                        //   name={`attachment-${index}`}
                                        //   className="border-0"
                                        //   value=""
                                        // />
                                        <div key={index} className="flex ml-2 text-sm">
                                          {attachment.name}
                                          <button onClick={() => handleFileRemove(index)}>Remove</button>
                                        </div>
                                        )
                                      }                                                               
                                      <div className="p-2">
                                          <RemoveCircleIcon
                                              className="w-[15px] h-[15px] text-drawer-icon cursor-pointer"
                                              onClick={() => removeAttachmentInput(index)}
                                          />
                                      </div>
                                  </div>
                              ))}
                              {attachments.length < 4 && (
                                  <Button variant="outline" onClick={addAttachmentInput}>Add Attachments</Button>
                              )}
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

                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </div>
    </VerificationCheck>    
  )
}

export default page
