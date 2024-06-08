"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
// import ComponentStyle from "styled-components/dist/models/ComponentStyle";

const tagVariants = cva(
  "h-fit inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover border border-secondary-border-alt",
        static:
          "bg-secondary text-secondary-foreground border border-secondary-border-alt",
        "static-destructive":
          "bg-destructive text-destructive-foreground border border-destructive-border",
        "static-warning":
          "bg-amber-300 text-foreground border border-amber-300",
        "static-success":
          "bg-green-500 text-background border border-green-500",
        test: "bg-black text-white border border-black",
      },
      size: {
        default: "px-4 py-2",
        sm: "text-xs px-2 py-[4px]",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        static:
          "flex items-center gap-2 py-[6px] px-[16px] w-fit rounded-full font-normal cursor-default",
      },
      state: {
        default: "bg-secondary-hover text-secondary-foreground",
        active: "bg-secondary-hover text-secondary-foreground",
        disabled: "bg-gray-300 text-gray-500 border-gray-300",
        focus: "ring ring-primary",
        hover: "hover:bg-secondary-hover",
        selected: "bg-primary text-background",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      // state: "default",
    },
  }
);

const Tag = React.forwardRef(
  ({ className, variant, size, state, asChild = false, ...props }, ref) => {
    // const Comp = asChild ? Slot : Button;
    return (
      <>
        {asChild ? (
          <Slot
            className={cn(tagVariants({ variant, size, state, className }))}
            ref={ref}
            {...props}
          />
        ) : (
          <div
            className={cn(tagVariants({ variant, size, state, className }))}
            ref={ref}
            {...props}
          ></div>
        )}
      </>
    );
  }
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
