interface NavigationItemProps {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  showBadge?: boolean;
}

export const NavigationItem = ({
  icon,
  label,
  onClick,
  showBadge = false
}: NavigationItemProps) => {
  return (
    <button onClick={onClick} className="flex items-center h-[30px] w-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] focus-visible:ring-0 focus-visible:outline-none p-1 group/sidebar">
      <div className="shrink-0 grow-0 rounded-sm size-[22px] flex justify-center items-center ml-1 mr-2">
        {icon}
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
        {label}
      </div>
      {showBadge && (
        <div className="ml-auto text-[10px] border font-mono tracking-tighter bg-[#efefed] dark:bg-[#2c2c2c] dark:border-none
          py-0.5 px-1.5 rounded-sm group-hover/sidebar:bg-[#F7F7F5] dark:group-hover/sidebar:bg-[#202020]"
        >
          ⌘ k
        </div>
      )}
    </button>
  );
}