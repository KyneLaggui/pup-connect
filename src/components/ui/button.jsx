import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary-hover hover:border-primary hover:text-primary",
        ghost: "hover:bg-neutral hover:text-neutral-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        tertiary:
          "bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover",
        green: "bg-green-500 text-primary-foreground hover:bg-primary-hover"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8 py-2",
        xl: "rounded-lg px-10 py-3 text-md font-semibold",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        link: "h-fit",
        "link-md": "text-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
