"use client";

import EvalResultsAdmin from "@/app/pages/evalResultsAdmin/[id]/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const ChangeStatus = ({ data }) => {
  const companyName = data?.company_name || "Unknown Company";
  const companyStatus = data?.status || "Unknown Status";

  const [isChangeStatusDialogOpen, setIsChangeStatusDialogOpen] =
    useState(false);
  const [isViewEvaluationDialogOpen, setIsViewEvaluationDialogOpen] =
    useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleDialogOpenChange = (setter) => (isOpen) => setter(isOpen);

  const DialogContentWrapper = ({ children }) => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change status</DialogTitle>
        <DialogDescription>
          Do you want to change the status of {companyName}?
        </DialogDescription>
      </DialogHeader>
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder={companyStatus} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Button
          className="flex-1 min-w-[180px]"
          onClick={() => setIsChangeStatusDialogOpen(false)}
        >
          Save
        </Button>
        <Button
          variant="secondary"
          className="flex-1 min-w-[180px]"
          onClick={() => setIsChangeStatusDialogOpen(false)}
        >
          Cancel
        </Button>
      </div>
      {children}
    </DialogContent>
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{companyName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsChangeStatusDialogOpen(true)}>
            Change status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsViewEvaluationDialogOpen(true)}>
            View evaluation
          </DropdownMenuItem>
          {/* Change the function to delete function */}
          <DropdownMenuItem onClick={() => console.log("Delete")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={isChangeStatusDialogOpen}
        onOpenChange={handleDialogOpenChange(setIsChangeStatusDialogOpen)}
      >
        <DialogContentWrapper />
      </Dialog>

      {isDesktop ? (
        <Dialog
          open={isViewEvaluationDialogOpen}
          onOpenChange={handleDialogOpenChange(setIsViewEvaluationDialogOpen)}
        >
          <DialogContent
            className={"mt-4 lg:max-w-[1024px] overflow-y-scroll max-h-screen"}
          >
            <EvalResultsAdmin data={data} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={isViewEvaluationDialogOpen}
          onOpenChange={handleDialogOpenChange(setIsViewEvaluationDialogOpen)}
        >
          <DrawerContent className={"h-[90%] overflow-y-hidden p-5"}>
            <ScrollArea className="overflow-y-scroll mt-5">
              <EvalResultsAdmin data={data} />
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ChangeStatus;
