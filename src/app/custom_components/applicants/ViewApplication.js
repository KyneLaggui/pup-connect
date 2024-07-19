"use client"
import ApplicationView from "@/app/custom_components/applicants/ApplicationView";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@mui/material";
import { EyeIcon } from "lucide-react";
import { useState, useEffect } from "react";

const ViewApplication = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    birthDate: null,
    applicationDate: null,
    gender: "",
    phoneNumber: "",
    socialLinks: [],
    coverLetter: "",
    additionalNotes: "",
    region: "",
    cityOrProvince: "",
    streetAddress: "",
    resume: null,
    updateUI: null
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (data) {
      setCurrentData({
        id: data.id,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        birthDate: data.birthDate,
        applicationDate: data.applicationDate,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        socialLinks: data.socialLinks,
        coverLetter: data.coverLetter,
        additionalNotes: data.additionalNotes,
        resume: data.resume,
        region: data.region,
        cityOrProvince: data.cityOrProvince,
        streetAddress: data.streetAddress,
        updateUI: data.updateUI
      })
    }
  }, [data])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen} className="">
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="icon-sm"
            className="ml-2"
            onClick={() => setOpen(true)}
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent
          className={"mt-4 lg:max-w-[760px] overflow-y-scroll max-h-screen"}
        >
          <div className="mt-10">
            <ApplicationView data={currentData}  />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size="icon-sm"
          className="ml-2"
          onClick={() => setOpen(true)}
        >
          <EyeIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={"h-[90%] overflow-y-hidden p-5"}>
        <ScrollArea className="overflow-y-scroll mt-5">
          <ApplicationView data={currentData} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default ViewApplication;
