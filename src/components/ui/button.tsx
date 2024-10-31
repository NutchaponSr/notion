import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "border border-[#eb575780] hover:bg-[#eb57571a] text-[#eb5757]",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-[#008AF2] hover:bg-[#005ccb] text-accent shadow-[0px_0px_0px_1px_rgba(15,15,15,0.1)_inset,0px_1px_2px_rgba(15,15,15,0.1)]",
        tritrary: "bg-[#ebf5fe] text-[#087fe7] hover:bg-[#d6e1f5]",
        outline: "text-[#7c7c78] hover:bg-[#37352f0f] border border-[#37352f29]",
        active: "bg-[#2383e208] text-[#2383e2] hover:bg-[#2383e212] border border-[#2383e259]",
        gray: "border text-[#37352f] border-[#37352f29] hover:bg-[#37352f0f]"
      },
      size: {
        default: "h-[30px] px-2 py-2",
        sm: "h-7 rounded-md px-1.5 text-xs",
        lg: "h-9 rounded-md px-3",
        xl: "h-[45px] rounded-lg px-5 py-2.5",
        filter: "h-6 px-2 rounded-full",
        icon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
