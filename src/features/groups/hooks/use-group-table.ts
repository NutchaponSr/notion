import { 
  getCoreRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import { useMemo } from "react";

import { columns } from "@/features/groups/components/group-column";
import { useGetGroups } from "@/features/groups/api/use-get-groups";
import { useSort } from "@/stores/use-sort";
import { sortBy } from "@/lib/utils";

import { Group } from "@/features/groups/types";

export const useGroupTable = () => {
  const { activeSort } = useSort();
  const { data: groups, isLoading } = useGetGroups();

  console.log(activeSort);

  const sortedData = useMemo(() => {
    if (!activeSort || !groups) return groups || [];

    return sortBy(
      groups,
      activeSort.label.toLowerCase() as keyof Group,
      activeSort.direction
    );
  }, [groups, activeSort]);

  const table = useReactTable({
    data: sortedData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    isLoading
  }
}