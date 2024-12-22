import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "~/trpc/react";

export default function useLatestSeen() {
    const session = useSession();
    const seen = api.seen.now.useMutation();

    useEffect(() => {
        if (session.status != "authenticated") return;
        // First call immediately
        seen.mutate();

        // Set up interval
        const interval = setInterval(() => {
            seen.mutate();
        }, 30000); // 30 seconds in milliseconds

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(interval);
    }, [session.status]); // Dependencies array includes seen
}
