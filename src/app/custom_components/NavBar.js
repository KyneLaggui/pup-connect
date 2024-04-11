import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <div className="w-full flex justify-center backdrop-blur-sm fixed top-0 bg-background h-20">
      <div className="max-w-[1200px] flex w-full justify-between py-5 items-center">
        <div>
          <h1 className="text-logo font-semibold text-foreground">
            PUP Connect
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="tertiary">Home</Button>
          <Button variant="tertiary">Explore</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Sign up</Button>
          <Button variant="default">Sign in</Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
