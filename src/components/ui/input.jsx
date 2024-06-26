import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, onInputHandleChange, name, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input-border bg-input px-[12px] py-[6px] text-sm ring-offset-background file:border file:rounded-md  file:bg-background file:border-muted  file:py-1 file:px-2  file:text-xs file:font-normal file:text file:text-forms-label placeholder:text-input-placeholder placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        name={name}
        onChange={onInputHandleChange}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
