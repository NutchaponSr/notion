import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="w-screen h-full relative flex">
        <Sidebar />
        <div className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#191919]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;