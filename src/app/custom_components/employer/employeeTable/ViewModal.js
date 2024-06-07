"use client";

import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import EmployeeProfile from "./EmployeeProfile";
import { Button } from "@/components/ui/button";

const ViewModal = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen} className="">
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm">
            View
          </Button>
        </DialogTrigger>
        <DialogContent
          className={"mt-4 lg:max-w-[760px] overflow-y-scroll max-h-screen"}
        >
          <div className="mt-10">
            <EmployeeProfile />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="sm">
          View
        </Button>
      </DrawerTrigger>
      <DrawerContent className={"h-[90%] max-h-screen overflow-y-scroll p-5"}>
        <EmployeeProfile />
      </DrawerContent>
    </Drawer>
  );
};

export default ViewModal;
