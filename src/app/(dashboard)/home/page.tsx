import { WorkspaceList } from "@/components/workspace-list";
import { WelcomeMessage } from "@/components/welcome-message";

const HomePage = () => {
  return (
    <main className="grow-0 shrink flex flex-col h-full max-h-full w-full transition-all">
      <div className="w-full grid grid-cols-[minmax(56px,1fr)_minmax(auto,900px)_minmax(56px,1fr)] pb-40 gap-6">
        <WelcomeMessage />
        <WorkspaceList />
      </div>
    </main>
  );
}

export default HomePage;