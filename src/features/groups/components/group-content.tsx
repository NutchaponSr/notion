"use client";

import { Toolbar } from "@/features/groups/components/toolbar";
import { columns } from "@/features/groups/components/group-column";

import { useGetGroups } from "../api/use-get-groups";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";

export const GroupContent = () => {
  const { data: groups, isLoading } = useGetGroups();

  const table = useReactTable({
    data: groups || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return null;

  return (
    <div className="contents">
      <Toolbar />
      <DataTable table={table} />
    </div>
  );
}