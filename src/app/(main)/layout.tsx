import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-full">
      <Header />
      <div className="flex flex-col space-y-8">
        <main className="mx-auto w-full min-h-full h-full" style={{ padding: "0 round(up, 7.22223%, .2rem)" }}>
          <div className="max-w-[1252px] m-auto w-full flex flex-col xl:gap-7">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;