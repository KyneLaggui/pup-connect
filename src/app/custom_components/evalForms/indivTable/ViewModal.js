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

import EachResult from "../EachResult";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area'

const ViewModal = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                variant="secondary"
                size="sm"
                >
                View
                </Button>
            </DrawerTrigger>
            <DrawerContent className={"h-[90%] p-5"}>
                <ScrollArea className="overflow-y-scroll mt-5">
                    <EachResult/>
                </ScrollArea>
                
            </DrawerContent>            
            
        </Drawer>
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
        <EachResult />
      </DrawerContent>
    </Drawer>
  );
};

export default ViewModal;
