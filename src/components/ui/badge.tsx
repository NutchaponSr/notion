import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "flex items-center shrink-0 min-w-0 max-w-full rounded-full h-5 px-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap space-x-1",
  {
    variants: {
      variant: {
        primary: "bg-[#d3e5ef] text-[#183347] dark:bg-[#28456c] dark:text-[#ffffffcd]"
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
