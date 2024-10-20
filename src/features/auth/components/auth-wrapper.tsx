interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const AuthWrapper = ({
  children,
  title,
  description
}: AuthWrapperProps) => {
  return (
    <section className="px-[60px] w-full mx-auto overflow-visible">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center"> 
          <div className="mb-6 max-w-[320px] w-full" style={{ marginTop: "10vh" }}>
            <div className="flex flex-col text-left font-semibold text-xl">
              <h1 className="text-black">{title}</h1>
              <p className="text-[#acaba9]">{description}</p>
            </div>
          </div>
          <div className="w-full max-w-[320px] flex flex-col items-center" style={{ marginBottom: "16vh" }}>
            {children}
            <div className="w-full mt-16 mb-0 text-xs text-[#787774] text-center text-balance">
              <p className="mb-0">
              Your name and photo are displayed to users who invite you to a workspace using your email. By continuing, you acknowledge that you understand and agree to the 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}