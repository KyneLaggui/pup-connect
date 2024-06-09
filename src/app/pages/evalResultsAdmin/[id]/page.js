"use client";
import React, { useState } from "react";
import ChartsResult from "../../../custom_components/evalForms/ChartsResult";
import EachResult from "../../../custom_components/evalForms/EachResult";

import IndivTable from "@/app/custom_components/evalForms/indivTable/page";

import QuestionTable from "@/app/custom_components/evalForms/questionTable/page";

const page = () => {
  const [activeTab, setActiveTab] = useState("charts");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="flex">
      <div className="container-sidebar">
        <div className="flex flex-col gap-4 border-b border-muted py-4">
          <div className="flex flex-col items-center ">
            <h1 className="text-lg font-medium">Evaluation form</h1>
            <h1 className="text-2xl font-semibold text-primary">
              Accenture Philippines
            </h1>
          </div>
          <div className="flex items-center justify-center gap-7">
            <button
              className={`relative border-none text-md font-medium transition-colors duration-300 ease-in pb-2 cursor-pointer focus:outline-none ${
                activeTab === "charts" ? "text-primary font-semibold" : ""
              }`}
              onClick={() => handleTabClick("charts")}
            >
              Charts
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transition-transform duration-300 ease-in ${
                  activeTab === "charts"
                    ? "transform origin-left scale-x-100"
                    : "transform origin-right scale-x-0"
                }`}
              ></span>
            </button>
            <button
              className={`relative border-none transition-colors text-md font-medium duration-300 ease-in pb-2 cursor-pointer focus:outline-none ${
                activeTab === "table" ? "text-primary font-semibold" : ""
              }`}
              onClick={() => handleTabClick("table")}
            >
              Table
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transition-transform duration-300 ease-in ${
                  activeTab === "table"
                    ? "transform origin-left scale-x-100"
                    : "transform origin-right scale-x-0"
                }`}
              ></span>
            </button>
            <button
              className={`relative border-none transition-colors text-md font-medium duration-300 ease-in pb-2 cursor-pointer focus:outline-none ${
                activeTab === "individual" ? "text-primary font-semibold" : ""
              }`}
              onClick={() => handleTabClick("individual")}
            >
              Individual
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transition-transform duration-300 ease-in ${
                  activeTab === "individual"
                    ? "transform origin-left scale-x-100"
                    : "transform origin-right scale-x-0"
                }`}
              ></span>
            </button>
          </div>
        </div>

        <div className={`${activeTab === "charts" ? "" : "hidden"}`}>
          <ChartsResult />
        </div>

        <div className={`${activeTab === "table" ? "" : "hidden"}`}>
          <QuestionTable />
        </div>

        <div className={`${activeTab === "individual" ? "" : "hidden"}`}>
          <IndivTable />
        </div>
      </div>
    </div>
  );
};

export default page;
