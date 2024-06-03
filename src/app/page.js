// "use client";

import Footer from "@/app/custom_components/Footer";

import Image from "next/image";

import { heroBG } from "@assets/index";

import { Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag } from "@/app/custom_components/Tag";
import VerificationCheck from "./layouts/VerificationCheck";
import { tagList } from "./tag_lists";

const Hero = () => {
  return (
    <VerificationCheck>
      <div className="relative ">
            <div className="container min-h-screen flex flex-col justify-center items-center z-50 overflow-hidden max-h-screen">
              <Image
                className="absolute bg-fixed bg-clip-content top-0 left-0 w-full -z-50 max-h-screen"
                src={heroBG}
                alt="Company Logo"
              />
              <div className="flex items-center gap-2 mb-2 p-2 bg-tag py-[6px] px-[16px] w-fit rounded-full border-[1px] border-tag-border">
                <span className="text-sm text-tag-foreground">
                  Make it happen today!
                </span>
                <Briefcase className="h-[14px] w-[14px] text-primary" />
              </div>

              <h1 className="text-5xl font-bold leading-tight text-center mb-8">
                Experience Matters:<br></br>
                <span className="bg-gradient-to-b from-primary-hover to-primary bg-clip-text text-transparent">
                  Land Your Dream Internship Today
                </span>
              </h1>

              <div className="flex gap-2 mb-6">
                {/* Start of Search  */}
                <Input
                  type="text"
                  id="keyword"
                  placeholder="Company/Job Title"
                  className="bg-input border-input-border font-medium"
                />
                <Input
                  type="text"
                  id="tag"
                  placeholder="Tag/Keyword"
                  className="bg-input border-input-border font-medium"
                />
                <Input
                  type="text"
                  id="location"
                  placeholder="Location"
                  className="bg-input border-input-border font-medium"
                />
                <Button variant="default">Search</Button>
                {/* End of Search */}
              </div>

              <div className="flex w-[60%] gap-2 items-center justify-center flex-wrap">
                {tagList.map((tag) => (
                  <Tag variant="default" key={tag.name}>
                    {tag.name}
                  </Tag>
                ))}
              </div>
          </div>
        <Footer />
      </div>
    </VerificationCheck>
  );
};

export default Hero;
