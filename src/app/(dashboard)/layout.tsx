import { Sidebar } from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="w-screen h-full relative flex bg-white">
        <Sidebar />
        <div className="order-3 cursor-text">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;