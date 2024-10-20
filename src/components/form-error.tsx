interface FormErrorProps {
  message?: string | null;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="border border-[#eb575780] bg-[#eb57571a] p-3 rounded-md flex flex-center items-center gap-x-2 text-sm text-[#eb5757]">
      { message }
    </div>
  );
}
