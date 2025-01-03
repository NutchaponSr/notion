import Image from "next/image";

import { auth } from "@/auth";

const TasksPage = async () => {
  const session = await auth();

  return (
    <main className="w-[88vw] max-w-[1392px] mx-auto min-h-[calc(100vh-160px)]">
      <section className="my-[60px] block">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 gap-12">
            <div className="lg:max-w-4xl max-w-2xl text-start flex flex-col mx-auto">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-center">
                Welcome back
              </h1>
              <h2 className="text-5xl font-semibold underline text-center">
                {session?.user.name}
              </h2>
            </div>
            <div className="lg:max-w-4xl max-w-2xl text-start flex flex-col mx-auto">
              <div className="flex flex-col space-y-2">
                <Image 
                  src="/empty.png"
                  alt="EmptyTask"
                  width={420}
                  height={100}
                  className="block dark:hidden"
                />
                <Image 
                  src="/empty-dark.png"
                  alt="EmptyTask"
                  width={420}
                  height={100}
                  className="hidden dark:block"
                />
                <div className="text-muted-foreground text-center">
                  You don&apos;t have any task.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TasksPage;