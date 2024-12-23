import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (!session.user.onboarded) {
    redirect("/onboarding");
  }

  redirect("/home");
}
