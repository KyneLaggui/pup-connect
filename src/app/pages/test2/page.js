"use client";
import Swal from "sweetalert2";
import { Alert } from "@/app/custom_components/Alert";
import { useEffect } from "react";

const page = () => {
  const handleClick = () => {
    Alert("question", "Kyne bakla", "Proven and tested");
  };

  return (
    <div className="ml-20">
      <button className="bg-red-500" onClick={handleClick}>
        Hello
      </button>
    </div>
  );
};

export default page;
