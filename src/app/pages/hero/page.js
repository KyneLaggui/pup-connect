"use client";

import NavBar from "@/app/custom_components/NavBar";
import Footer from "@/app/custom_components/Footer";
import Image from "next/image";

import { Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import TagsCard from "@/app/custom_components/TagsCard";
import { Tag } from "@/app/custom_components/Tag";

import { tagList } from "../../tag_lists";

const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute">
        <svg xmlns=""></svg>
      </div>
      <NavBar />
      <div className="container min-h-screen flex flex-col justify-center items-center">
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
  );
};

export default Hero;
