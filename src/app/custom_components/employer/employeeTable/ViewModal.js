"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import EmployeeProfile from "./EmployeeProfile";

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
      <DrawerContent className={"h-[90%] overflow-y-hidden p-5"}>
        <ScrollArea className="overflow-y-scroll mt-5">
          <EmployeeProfile />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default ViewModal;
