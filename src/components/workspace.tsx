import { HiMiniBuildingLibrary, HiMiniCircleStack } from "react-icons/hi2";

import { IconWrapper } from "./icon-wrapper";

export const Workspace = () => {
  return (
    <div className="flex flex-col w-full mb-3">
      <div className="flex items-center px-3 py-1.5 text-xs text-[#91918e]">
        Workspace
      </div>
      <div className="flex flex-col">
        <button onClick={() => {}} className="flex items-center h-[30px] w-full hover:bg-[#00000008] focus-visible:ring-0 focus-visible:outline-none p-1 group/workspace">
          <IconWrapper className="bg-[#f5e0e9] text-[#ac5488]">
            <HiMiniCircleStack className="size-[18px]" />
          </IconWrapper>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            Group
          </div>
        </button>
        <button onClick={() => {}} className="flex items-center h-[30px] w-full hover:bg-[#00000008] focus-visible:ring-0 focus-visible:outline-none p-1 group/workspace">
          <IconWrapper className="bg-[#fadec9] text-[#C47830]">
            <HiMiniBuildingLibrary className="size-[18px]" />
          </IconWrapper>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            Competency
          </div>
        </button>
      </div>
    </div>
  );
}