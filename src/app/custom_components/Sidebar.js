"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Icons
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// Images

import { PUPLogo } from "@assets/index";
import { useRouter } from "next/navigation";
import { signOut } from "@/supabase/actions";
import fetchRoleButtons from "@/app/nav_buttons/index";


const Sidebar = () => {
  const [buttons, setButtons] = useState([]);

  const router = useRouter();
  const roleButtons = fetchRoleButtons()

  const handleSignOut = () => {
      console.log('okay')
      signOut();
      router.push("/pages/login")
  }

  useEffect(() => {
    setButtons(roleButtons)
  }, [roleButtons])
  
  return (
    <div>
      <aside className="fixed hidden inset-y-0 left-0 z-50 w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Image src={PUPLogo} alt="PUP Logo" />
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
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5 cursor-pointer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  onClick={() => handleSignOut()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-destructive-foreground bg-destructive transition-colors hover:bg-destructive-hover md:h-8 md:w-8"
                >
                  <LogoutOutlinedIcon className="w-5 h-5" />
                  <span className="sr-only">Sign out</span>
                </p>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-destructive text-destructive-foreground border-destructive-border"
              >
                Sign out
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden w-full mb-5 sm:mb-0 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
              <Link href="/" className="group flex items-center gap-3 shrink-0">
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
              <Button size="lg" variant="destructive" className="text-lg gap-2">
                <LogoutOutlinedIcon />
                <p onClick={() => handleSignOut()}>Sign out</p>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};

export default Sidebar;
