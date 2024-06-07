import { Tag } from "@/app/custom_components/Tag";
import { useContext, useEffect, useState } from "react";
import { companyTags } from "../../constants";
import { StepperContext } from "../StepperContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Tags = () => {
  const { companyData, setCompanyData } = useContext(StepperContext);
  const [selectedTags, setSelectedTags] = useState(companyData.tags || []);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      const updatedTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];
      setCompanyData((prevData) => ({
        ...prevData,
        tags: updatedTags,
      }));
      return updatedTags;
    });
  };

  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

 

  

  return (
    <div className="flex flex-col items-center">
      
      <div
        className={`flex flex-wrap gap-3 justify-center mt-8 transition-all duration-500 ease-in-out`}
      >
        {companyTags.map((tag, index) => (
          <div key={index} className="flex items-center gap-2">
            <Tag
              variant="static"
              size="default"
              state={selectedTags.includes(tag) ? "selected" : "default"}
              onClick={() => handleTagClick(tag)}
              className="cursor-pointer"
            >
              {tag}
            </Tag>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Tags;
