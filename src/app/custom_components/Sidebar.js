"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

// Icons
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// Images
import { PUPLogo } from "@assets/index";
import roleButtons from "@/app/nav_buttons/index";

const Sidebar = () => {
  let role = "admin"; // Change this to "admin", "faculty", and "user" to see different buttons
  const [buttons, setButtons] = useState(roleButtons[role] || []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Image src={PUPLogo} alt="PUP Logo" />
            <span className="sr-only">PUP Connect</span>
          </Link>
          {buttons.map((button, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={button.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground
                                transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    {button.icon}
                    <span className="sr-only">{button.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{button.tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-destructive-foreground bg-destructive transition-colors hover:bg-destructive-hover md:h-8 md:w-8"
                >
                  {/* <Settings className="h-5 w-5" /> */}
                  <LogoutOutlinedIcon className="w-5 h-5" />
                  <span className="sr-only">Sign out</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sign out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <MenuOutlinedIcon />

                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="sm:max-w-xs flex flex-col justify-between"
            >
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex items-center gap-3 shrink-0"
                >
                  <Image src={PUPLogo} alt="PUP Logo" className="w-10 h-10" />
                  <h1 className="text-logo font-semibold text-foreground">
                    PUP Connect
                  </h1>
                </Link>

                {buttons.map((button, index) => (
                  <Link
                    href={button.href}
                    key={index}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {button.icon}
                    {button.name}
                  </Link>
                ))}
              </nav>
              <nav className="grid gap-3 text-lg font-medium">
                <Button
                  size="lg"
                  variant="destructive"
                  className="text-lg gap-2"
                >
                  <LogoutOutlinedIcon />
                  <Link href="/">Sign out</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
};

export default Sidebar;
