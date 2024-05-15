import { Globe, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full z-50">
      <div className="container flex justify-between items-center p-2 mt-2 py-6 border-t-[1.8px] border-muted">
        <div className="text-sm">©2024 PUP Connect. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <div className="h-[24px] w-[24px] bg-primary rounded-full flex items-center justify-center">
            <a
              href="https://www.pup.edu.ph/"
              target="_blank"
              className="flex items-center justify-center text-center"
            >
              <span className="material-symbols-outlined text-sm text-primary-foreground">
                public
              </span>
            </a>
          </div>
          <div className="h-[24px] w-[24px] bg-primary rounded-full flex items-center justify-center">
            <a
              href="https://www.facebook.com/ThePUPOfficial"
              target="_blank"
              className="flex items-center justify-center text-center"
            >
              <Facebook
                fill="currentColor"
                className="h-[14px] w-[14px] text-primary-foreground"
              />
            </a>
          </div>
          <div className="h-[24px] w-[24px] bg-primary rounded-full flex items-center justify-center">
            <a
              href="https://www.facebook.com/pupcareer"
              target="_blank"
              className="flex items-center justify-center text-center"
            >
              <span className="material-symbols-outlined text-sm text-primary-foreground">
                handshake
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
