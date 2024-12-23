import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/api/root";
import SuperJSON from "superjson";

export const client = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "/api/trpc",
            transformer: SuperJSON,
        }),
    ],
});
