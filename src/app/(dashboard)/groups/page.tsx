import { Button } from "@/components/ui/button";

import { 
  FolderLibraryIcon,
  InfoIcon
} from "@/components/icons";

import { GroupContent } from "@/features/groups/components/group-content";

const GroupsPage = () => {
  return (
    <main className="grow-0 shrink flex flex-col h-[calc(100vh-44px)] max-h-full relative w-auto transition-all pt-11">
      <div className="flex flex-col grow relative overflow-auto">
        {/* Header */}
        <div className="w-full flex flex-col items-center shrink-0 grow-0 sticky left-0 group">
          <div className="w-full pl-24 max-w-full">
            <div className="flex opacity-0 group-hover:opacity-100 justify-start flex-wrap py-1 transition duration-75">
              <Button variant="ghost" className="text-[#37352f80] hover:text-[#37352f80] dark:text-[#ffffffcf]">
                <InfoIcon className="size-4 fill-[#37352f80] dark:fill-[#ffffffcf]" variant="SOLID" />
                Hide Description 
              </Button>
            </div>
            <div className="pr-24 mb-2 w-full mt-1">
              <div className="flex justify-start space-x-2">
                <FolderLibraryIcon className="size-9 fill-[#ac5488] dark:fill-[#b24b78]" variant="BULK" />
                <h1 className="text-3xl text-[#37352f] dark:text-[#ffffffcf] font-bold flex items-center whitespace-pre-wrap">
                  Group
                </h1>
              </div>
              <p className="max-w-full w-full whitespace-pre-wrap text-[#37352f] dark:text-[#ffffffcf] font-semibold text-sm p-1">
                Combining diverse skills to achieve shared goals.
              </p>
            </div>
          </div>
        </div>
        <GroupContent />
      </div>
    </main>
  );
}

export default GroupsPage;