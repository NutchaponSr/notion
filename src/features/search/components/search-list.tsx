import { 
  useEffect, 
  useRef, 
  useState 
} from "react";
import { useKeyboard } from "@/hooks/use-keyboard";

import { cn, formatTimeElapsed } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import {
  CornerDownLeftIcon,
  HashIcon
} from "@/components/icons";

import { ResponseType } from "@/features/search/api/use-get-search";

interface SearchListProps {
  data: ResponseType;
}

export const SearchList = ({
  data
}: SearchListProps) => {
  const [index, setIndex] = useState(0);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const itemRefs = useRef<HTMLDivElement[]>([]);
  const keyboardTimeoutRef = useRef<NodeJS.Timeout | null>(null);  

  const activateKeyboardMode = () => {
    setIsKeyboardActive(true);
    if (keyboardTimeoutRef.current) {
      clearTimeout(keyboardTimeoutRef.current);
    }
    keyboardTimeoutRef.current = setTimeout(() => {
      setIsKeyboardActive(false);
    }, 1000); 
  };

  const mappedData = data.flatMap((item) => (
    item.data
  )) || [];

  useKeyboard([
    {
      key: "ArrowUp",
      action: () => {
        setIndex((prev) => (prev > 0 ? prev - 1 : mappedData.length - 1));
        activateKeyboardMode();
      },
    },
    {
      key: "ArrowDown",
      action: () => {
        setIndex((prev) => (prev < mappedData.length - 1 ? prev + 1 : 0));
        activateKeyboardMode();
      },
    },
    {
      key: "Enter",
      action: () => {
        if (index < mappedData.length) {
          const itemToSelect = mappedData[index];
          console.log("Selected item:", itemToSelect);
        }
      }
    }
  ]);

  useEffect(() => {
    if (isKeyboardActive && itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [index, isKeyboardActive]);

  useEffect(() => {
    return () => {
      if (keyboardTimeoutRef.current) {
        clearTimeout(keyboardTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {data?.map(({ label, data }) => (
        data.length > 0 ? (
          <div key={label} className="mb-[18px]">
            <div className="flex px-3 my-2 text-[#37352fa6] dark:text-[#ffffff71] text-xs font-semibold">
              {label}
            </div>
            {data.map((item) => {
              const globalIndex = mappedData?.findIndex(
                data => data.id === item.id
              );

              return (
                <div
                  key={item.id}
                  className={cn(
                    "mx-1 rounded-[6px] cursor-pointer group",
                    globalIndex === index && "bg-[#37352f0f] dark:bg-[#ffffff0e]"
                  )}
                  ref={(el) => {
                    if (el) itemRefs.current[globalIndex] = el;
                  }}
                  onMouseEnter={() => {
                    if (!isKeyboardActive) {
                      setIndex(globalIndex);
                    }
                  }}
                >
                  <div className="flex items-center w-full min-h-9 text-sm py-2">
                    <div className="flex items-center justify-center ml-2.5 mr-1">
                      <div className="grid overflow-visible place-items-center">
                        <div className="flex items-center justify-center size-5">
                          {item.icon ? (
                            item.icon
                          ) : (
                            <HashIcon className="size-4 text-[#a5a29a]" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mx-1 flex-auto inline-flex items-center w-full">
                      <div className="flex items-center space-x-1 text-sm text-ellipsis overflow-hidden font-medium whitespace-nowrap">
                        <p className="text-[#37352f] dark:text-[#ffffffcf]">{item.name}</p>
                        <Separator className="w-3 h-[0.5px] bg-[#37352f80] dark:bg-[#ffffff21]" />
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis text-xs text-[#37352f80] dark:text-[#ffffff48]">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto mr-3 min-w-0 flex-none">
                      <div className="flex items-center">
                        {globalIndex === index ? (
                          <CornerDownLeftIcon className="size-3 text-[#acaba9] dark:text-[#5a5a5a]hidden group-hover:block" />
                        ) : (
                          <p className="text-xs text-[#acaba9] dark:text-[#5a5a5a] visible group-hover:hidden">
                            {formatTimeElapsed(item.createdAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          null
        )
      ))}
    </>
  );
}

SearchList.Skeleton = function SkeletonSearchList() {
  const skeletonItems = Array(10).fill(null);

  return (
    <div className="flex-1 w-full h-full px-3.5 my-2">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className={cn("flex items-center space-x-2 py-2", index < skeletonItems.length - 1 && "shadow-header")}
        >
          <Skeleton className="rounded-sm size-8" />
          <div className="flex flex-col w-full space-y-1">
            <Skeleton className="rounded-sm w-96 h-4" />
            <Skeleton className="rounded-[2px] w-40 h-2" />
          </div>
        </div>
      ))}
    </div>
  );
}