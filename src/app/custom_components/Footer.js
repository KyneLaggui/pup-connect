import { Globe, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="container flex justify-between items-center p-2 mt-2 py-6 border-t-[1.8px] border-muted">
        <div className="text-sm">©2024 PUP Connect. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <div className="h-[24px] w-[24px] bg-primary rounded-full flex items-center justify-center">
            <Globe className="h-[14px] w-[14px] text-primary-foreground" />
          </div>
          <div className="h-[24px] w-[24px] bg-primary rounded-full flex items-center justify-center">
            <Facebook className="h-[14px] w-[14px] text-primary-foreground" />
          </div>
          <div className="h-[24px] w-[24px] bg-primary rounded-full flex items-center justify-center">
            <Twitter className="h-[14px] w-[14px] text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
