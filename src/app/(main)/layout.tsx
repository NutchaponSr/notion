import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-full">
      <Header />
      <div className="flex flex-col space-y-8 ">
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;