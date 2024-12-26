import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

export type AppOutput = inferRouterOutputs<AppRouter>;
export type State = "loading" | "idel";

export type ChatState = AppOutput["chat"]["getAll"] & {
    state: State;
    isSideBarOpen: boolean;
};
