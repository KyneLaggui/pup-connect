import { Tag } from "@/app/custom_components/Tag";
import { useContext, useEffect, useState } from "react";
import { companyTags } from "../../constants";
import { StepperContext } from "../StepperContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Tags = () => {
  const { companyData, setCompanyData } = useContext(StepperContext);
  const [selectedTags, setSelectedTags] = useState(companyData.tags || []);
  const [showAll, setShowAll] = useState(false);

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

  const handleShowMoreClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const displayedTags = showAll ? companyTags : companyTags.slice(0, 10);

  return (
    <div className="flex flex-col items-center">
      <div className="">
        <Input
          placeholder="Search for tags"
          type="text"
          // onChange={(value) => {
          //   setSearch(value);
          // }}
        />
      </div>

      <div
        className={`flex flex-wrap gap-3 justify-center mt-8 transition-all duration-500 ease-in-out`}
      >
        {displayedTags.map((tag, index) => (
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
      <div className="flex justify-center w-full mt-8">
        {/* <button onClick={handleShowMoreClick} className="btn btn-primary">
          {showAll ? "Show Less" : "Show More"}
        </button> */}

        <Button variant="tertiary" size="sm" onClick={handleShowMoreClick}>
          {showAll ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
};

export default Tags;
