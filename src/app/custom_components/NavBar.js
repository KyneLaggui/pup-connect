import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from '../../components/ui/button'
import Link from "next/link";
import { LoggedOutOnlyComponent } from "../layouts/ComponentRestrictions";

import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

const NavBar = () => {
  return (
    // <LoggedOutOnlyComponent>
      <div className="w-full flex justify-center backdrop-blur-sm fixed top-0 bg-background h-20 z-50">
        <div className="hidden sm:flex xl:max-w-[1200px] w-full justify-between py-5 px-4 xl:px-0 items-center">
          <div className="w-40">
            <h1 className="text-logo font-semibold text-foreground">
              PUP Connect
            </h1>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="tertiary">Home</Button>
            </Link>
            <Link href="/pages/explore">
              <Button variant="tertiary">Explore</Button>
            </Link>
          </div>
          <div className="flex gap-2 w-40">
            <Link href="/pages/signup">
              <Button variant="secondary">Sign up</Button>
            </Link>
            <Link href="/pages/login">
              <Button variant="default">Sign in</Button>
            </Link>
          </div>
        </div>
        <div className="sm:hidden flex w-full justify-between py-5 px-4 xl:px-0 items-center">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-logo font-semibold text-foreground">
              PUP Connect
            </h1>
            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <MenuIcon className="text-black" />

                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="xs:max-w-xs flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/"
                      className="flex gap-4 items-center py-3 px-4 bg-neutral text-neutral-foreground rounded-lg font-semibold"
                    >
                      <HomeOutlinedIcon />
                      Home
                    </Link>
                    <Link
                      href="/"
                      className="flex gap-4 items-center py-3 px-4 bg-neutral text-neutral-foreground rounded-lg font-semibold"
                    >
                      <ExploreOutlinedIcon />
                      Explore
                    </Link>
                  </div>
                  <div className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/"
                      className="flex gap-4 items-center py-3 px-4 bg-secondary text-secondary-foreground rounded-lg font-semibold text-center justify-center"
                    >
                      Sign up
                    </Link>
                    <Link
                      href="/"
                      className="flex gap-4 items-center py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold text-center justify-center"
                    >
                      Sign in
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    // </LoggedOutOnlyComponent>
  );
};

export default NavBar;
