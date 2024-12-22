import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useProtected() {
    const session = useSession();
    useEffect(() => {
        if (session.status == "unauthenticated") location.replace("/api/auth/signin");
        if (session.status == "authenticated") {
            if (!session.data.user.boarded) location.replace("/onboarding");
        }
    }, [session.status, session?.data?.user?.boarded]);
}
