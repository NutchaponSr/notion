import { InferResponseType } from "hono";
import { ColumnDef } from "@tanstack/react-table";

import { client } from "@/lib/rpc";

import { Checkbox } from "@/components/ui/checkbox";

import {
  GripVerticalIcon,
  TextFontIcon,
  CalendarDayIcon
} from "@/components/icons";

type ResponseType = InferResponseType<typeof client.api.groups.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "action",
    cell: ({ }) => (
      <button className="flex items-center justify-center rounded-sm w-[18px] h-6 transition hover:bg-[#37352f0f]">
        <GripVerticalIcon className="text-[#B9B9B7]" />
      </button>
    )
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox 
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        className="size-3.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox 
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="size-3.5"
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center">
        <TextFontIcon className="size-4 text-[#A4A4A2] mr-1.5" />
        Name
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="size-[22px] inline-flex items-center justify-center mr-1">
            <div className="flex items-center justify-center size-5">
              {row.original.icon}
            </div>
          </div>
          <p className="text-sm font-medium">
            {row.original.name}
          </p>
        </div>
        <div className="whitespace-normal relative hidden group-hover:block border">
          <div className="flex justify-end absolute -top-3 right-0 left-0 mr-1">
            <div className="flex pointer-events-auto sticky right-1">
              {/* <GroupButtonPanel data={row.original} /> */}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "year",
    header: ({  }) => (
      <div className="flex items-center">
        <CalendarDayIcon className="size-3.5 text-[#A4A4A2] mr-1.5" />
        Year
      </div>
    ),
    cell: ({ row }) => row.getValue("year"),
  },
]