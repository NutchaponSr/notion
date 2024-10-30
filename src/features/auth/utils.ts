import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function protectsServer() {
  const session = await auth();

  if (!session) {
    redirect("/sign-up")
  }
}
