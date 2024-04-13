import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import TagsCard from "./TagsCard";

const JobCard = ({ title, description, image, tags }) => {
  return (
    <Card className="max-w-[296px] h-[160px] min-w-[240px] flex justify-between items-center flex-col p-5 border border-blue-100 bg-background">
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

      <div className="mt-3 w-full overflow-hidden">
        <TagsCard tags={tags} />
      </div>
    </Card>
  );
};

export default JobCard;
