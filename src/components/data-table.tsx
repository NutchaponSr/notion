"use client";

import {
  flexRender,
  Table as TB
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon, PlusIcon } from "@/components/icons";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DataTableProps<TData, TValue> {
  table: TB<TData>
}

export const DataTable = <TData, TValue>({ table }: DataTableProps<TData, TValue>) => {
  const isSelectedAll = table.getSelectedRowModel().rows.length > 0;

  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="relative float-left min-w-full pb-[180px] pr-[96px] pl-16">
      <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className={cn(
                  "border-none"
                )}>
                  {headerGroup.headers.map((header, _i) => (
                    <TableHead key={header.id} className={cn(
                      "group",
                      _i === 3 && "w-[156px]",
                      (_i === 0 || _i === 1) && "w-8",
                      (_i !== 0 && _i !== 1) && "hover:bg-[#37352f0f]",
                      _i !== 0 && _i !== 1 && _i !== headerGroup.headers.length - 1 && "border-r border-[#e9e9e7]",
                      header.column.id === "action" ? "shadow-none" : "shadow-[white_0px_0px_0px,rgb(233,233,231)_0px_1px_0px]"
                    )}>
                      <div className={cn(
                        "group-hover:opacity-100 transition ease-in",
                        (_i === 0 || _i === 1) && "opacity-0",
                        isSelectedAll && "opacity-100"
                      )}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => {
                  const isSelected = row.getIsSelected();
  
                  return (
                    <TableRow
                      key={row.id}
                      className="relative group"
                    >
                      {row.getVisibleCells().map((cell, _i) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "group/cell",
                            cell.column.id === "action" ? "border-none" : "border-b",
                            _i !== 0 && _i !== 1 && _i !== row.getVisibleCells().length - 1 && "border-r border-[#e9e9e7]",
                            _i === 2 && "font-medium",
                            _i === 3 && "text-end w-[156px]",
                          )}
                        >
                          <div
                            className={cn(
                              "group-hover/cell:opacity-100 transition ease-in",
                              (_i === 1) && "opacity-0",
                              (isSelected && _i === 1) && "opacity-100",
                              (_i === 0) && "opacity-0 group-hover:opacity-100"
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </TableCell>
                      ))}
                      {isSelected && (
                        <div className="absolute inset-0 top-[1px] bottom-0 bg-[#2383e224]
                          z-[86] rounded-sm pointer-events-none ml-8"
                        />
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell />
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="border-b hover:bg-[#37352f0f] text-[#37352fa6]"
                  >
                    No filter results. Click to add a row.
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell />
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="border-b hover:bg-[#37352f0f] cursor-pointer"
                >
                  <div className="flex items-center space-x-[6px]">
                    <PlusIcon className="size-4 text-[#A4A4A2]" />
                    <span className="font-normal text-sm text-[#37352fa6]">New</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell colSpan={2} className="hover:bg-[#37352f0f]">
                  <div className="flex justify-end items-center space-x-[6px]">
                    <span className="font-normal text-sm text-[#37352fa6]">Calculate</span>
                    <ChevronDownIcon className="size-4 text-[#A4A4A2]" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    </div>
  );
}