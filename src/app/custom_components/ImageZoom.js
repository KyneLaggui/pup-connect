// components/ImageZoom.js
import Image from "next/image";
import { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "@/components/ui/button";

export default function ImageZoom({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const handleClose = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleZoom}>
        <Image
          src={src}
          alt={alt}
          className="object-cover aspect-square rounded-lg border border-tertiary-border shadow-md cursor-pointer"
          width={180}
          height={180}
        />
      </div>

      {isZoomed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative flex flex-col items-end">
            <Image
              src={src}
              alt={alt}
              className="max-w-full max-h-full rounded-lg"
              width={440}
              height={440}
            />
            <Button
              onClick={handleClose}
              variant="tertiary"
              size="icon"
              className="absolute top-2 right-2 "
            >
              <CloseOutlinedIcon />
            </Button>
            <a href={src} target="_blank">
              <Button
                variant="link"
                size="link"
                className="right-0 text-white mt-2"
              >
                View original
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
