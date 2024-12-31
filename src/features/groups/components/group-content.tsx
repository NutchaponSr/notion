"use client";

import { DataTable } from "@/components/data-table";

import { Toolbar } from "@/components/toolbar";

import { useGroupTable } from "@/features/groups/hooks/use-group-table";

export const GroupContent = () => {
  const { table, isLoading } = useGroupTable();

  if (isLoading) return null;

  return (
    <div className="contents">
      <Toolbar />
      <DataTable table={table} />
    </div>
  );
}