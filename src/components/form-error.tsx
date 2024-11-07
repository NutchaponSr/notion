import { cn } from "@/lib/utils";

interface FormErrorProps {
  message?: string | null;
  className?: string;
}

export const FormError = ({ message, className }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className={cn(
      "border border-[#eb575780] bg-[#eb57571a] p-3 rounded-md flex flex-center items-center gap-x-2 text-sm text-[#eb5757]",
      className
    )}>
      { message }
    </div>
  );
}
