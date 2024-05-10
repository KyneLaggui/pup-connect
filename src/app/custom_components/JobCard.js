"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Tag } from "@/app/custom_components/Tag";
import { useEffect } from "react";
import dynamic from 'next/dynamic'

// const TagWithNoSSR = dynamic(
//   () => import('@/app/custom_components/Tag'),
//   { ssr: false }
// )

const JobCard = ({ title, description, image, tags }) => {
  // useEffect(() => {
  //   const copy = document.querySelector(".slide").cloneNode(true);
  //   document.querySelector(".slide-container").appendChild(copy);
  // }, []);

  return (
    <Card className="slide-parent max-w-[296px] h-[160px] min-w-[240px] flex justify-between items-center flex-col p-5 border border-blue-100 bg-background">
      <div className="flex flex-col justify-start items-center gap-3">
        <div className="w-full flex items-center justify-start gap-2 flex-row">
          <Image
            src={image}
            width={20}
            height={20}
            alt="Company Logo"
            className="rounded-[1px]"
          />
          <CardTitle className="text-base --obsidian-950 font-medium">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-xs max-h-[42px] truncate-lines font-normal text-muted-foreground text-start">
          {description}
        </CardDescription>
      </div>

      <div className="mt-3 w-full overflow-hidden flex gap-1 slide-container">
        <div className="slide flex gap-1">
          {tags.map((tag, index) => (
            <Tag key={index} size="sm">
              {tag}
            </Tag>
          ))}
        </div>
        <div className="slide flex gap-1">
          {tags.map((tag, index) => (
            <Tag key={index} size="sm">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
