import { Header } from "@/features/auth/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen h-screen bg-[#fffefc]">
      <Header />
      <main className="pt-[80px] w-full h-full">
        <div className="flex flex-row w-full">
          { children }
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;