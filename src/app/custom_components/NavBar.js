import { Button } from "@/components/ui/button";
// import { Button } from '../../components/ui/button'
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="w-full flex justify-center backdrop-blur-sm fixed top-0 bg-background h-20 z-50">
      <div className="max-w-[1200px] flex w-full justify-between py-5 items-center">
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
          <Button variant="secondary">Sign up</Button>
          <Button variant="default">Sign in</Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
