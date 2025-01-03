"use client";

import { InfoIcon } from "lucide-react";

import { Button } from "./ui/button";

interface BannerProps {
  
}

export const Banner = () => {
  return (
    <div className="w-full flex flex-col items-center shrink-0 grow-0 sticky left-0 group">
      <div className="w-full pl-24 max-w-full">
        <div className="flex opacity-0 group-hover:opacity-100 justify-start flex-wrap py-1 transition duration-75">
          <Button variant="ghost" className="text-[#37352f80] hover:text-[#37352f80]">
            <InfoIcon className="size-4" />
            Hide Description 
          </Button>
        </div>
        <div className="pr-24 mb-2 w-full mt-1">
          <div className="flex justify-start space-x-2">
            <HiMiniCircleStack className="size-9 text-[#ac5488] dark:text-[#b24b78]" />
            <h1 className="text-3xl text-[#37352f] font-bold flex items-center whitespace-pre-wrap">
              Group
            </h1>
          </div>
          <p className="max-w-full w-full whitespace-pre-wrap text-[#37352f] font-semibold text-sm p-1">
            Combining diverse skills to achieve shared goals.
          </p>
        </div>
      </div>
    </div>
  );
}