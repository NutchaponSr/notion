import React, { useEffect, useRef, useState } from "react";
import { DotIcon, HashIcon, MoreHorizontalIcon } from "lucide-react";

import { Skeleton } from "./ui/skeleton";
import { WorkspaceItem, WorkspaceSubItem } from "./workspace-item";
import { IconWrapper } from "./icon-wrapper";
import { GroupActions } from "@/features/groups/components/group-actions";

import { useGetFavorites } from "@/features/groups/api/use-get-favorites";
import { GroupRenamePopover } from "@/features/groups/components/group-rename-popover";
import { useFavoriteItemChild } from "@/features/groups/stores/use-favorite-item-child";

export const Favorite = () => {
  const { 
    data: favorites,
    isLoading: loadingFavorites,
  } = useGetFavorites();

  const {
    isOpen: openFavoriteItemChild,
    onToggle: toggleFavoriteItemChild,
  } = useFavoriteItemChild();
  
  const [height, setHeight] = useState(0);
  const [isRename, setIsRename] = useState<Record<string, boolean>>({});

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRename && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setHeight(rect.top);
    }
  }, [isRename]);

  const onRename = (groupId: string) => {
    setTimeout(() => {
      setIsRename((prevState) => ({
        ...prevState,
        [groupId]: true,
      }));
    }, 200);
  };

  const closeRenamePopover = (groupId: string) => {
    setIsRename((prevState) => ({
      ...prevState,
      [groupId]: false,
    }));
  };

  if (loadingFavorites || !favorites) {
    return (
      <div className="flex flex-col w-full mb-3 px-1">
        <div className="flex items-center px-3 py-1.5 text-xs text-[#91918e]">
          Favorite
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[26px] w-full rounded-sm" />
          <Skeleton className="h-[26px] w-full rounded-sm" />
          <Skeleton className="h-[26px] w-full rounded-sm" />
        </div>
      </div>
    );
  }

  if (favorites.length <= 0) return null;
  
  return (
    <div className="flex flex-col w-full mb-3">
      <div className="flex items-center px-3 py-1.5 text-xs text-[#91918e]">
        Favorite
      </div>
      <div className="flex flex-col">
        {favorites.map((favorite) => {
          const initialData = {
            id: favorite.groupId,
            name: favorite.name!,
            year: favorite.year!,
            icon: favorite.icon,
            updatedAt: favorite.updatedAt!,
            updatedBy: favorite.updatedBy!,
            isFavorite: true
          }
          
          const isChild = openFavoriteItemChild[favorite.groupId];
          
          return (
            <React.Fragment key={favorite.groupId}>
              <div ref={itemRef}>
                <WorkspaceItem 
                  label={favorite.name!}
                  href={`/groups/${favorite.groupId}`}
                  sideButton={
                    <GroupActions data={initialData} onRename={() => onRename(favorite.groupId)}>
                      <button className="transition relative flex items-center justify-center size-6 rounded-sm text-[#91918e] hover:bg-[#37352f0f]">
                        <MoreHorizontalIcon className="size-[18px]" />
                      </button> 
                    </GroupActions>
                  }
                >
                  <IconWrapper
                    indent="ml-1"
                    isOpen={isChild}
                    onClick={() => toggleFavoriteItemChild(favorite.groupId)}
                  >
                    {favorite.icon ? (
                      favorite.icon
                    ) : (
                      <HashIcon className="size-[18px]" />
                    )}
                  </IconWrapper>
                </WorkspaceItem>
              </div>
              {isChild && (
                <>
                  <WorkspaceSubItem 
                    indent="ml-3" 
                    href={`/groups/${favorite.groupId}/competencies`}
                  >
                    <DotIcon className="size-4 mr-2" />
                    Competency
                  </WorkspaceSubItem>
                  <WorkspaceSubItem 
                    indent="ml-3" 
                    href={`/groups/${favorite.groupId}/employees`}
                  >
                    <DotIcon className="size-4 mr-2" />
                    Employee
                  </WorkspaceSubItem>
                </>
              )}
              <GroupRenamePopover 
                height={height}
                isOpen={isRename[favorite.groupId]}
                data={initialData}
                onClose={() => closeRenamePopover(favorite.groupId)}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}