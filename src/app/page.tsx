import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function HomePage() {
    const session = await auth();

    console.log(session);

    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    if (!session.user.isBoarded) {
        redirect("/onboarding");
    }

    redirect("/home");
}
