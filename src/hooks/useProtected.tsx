import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function useProtected() {
    const session = useSession();
    useEffect(() => {
        if (session.status === "unauthenticated") {
            redirect("/home");
        }
        if (!session.data?.user.isBoarded) {
            redirect("/onboarding");
        }
    }, [session.status]);
}
