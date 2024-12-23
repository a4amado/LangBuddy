import { createTRPCRouter } from "./trpc";
import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { chatRouter } from "./routers/chat";
import { messageRouter } from "./routers/message";
import { latestSeenRouter } from "./routers/latest-seen";
import { onBoardingRouter } from "./routers/onboarding";

export const appRouter = createTRPCRouter({
    post: postRouter,
    user: userRouter,
    chat: chatRouter,
    messege: messageRouter,
    seen: latestSeenRouter,
    boarding: onBoardingRouter,
});

export type AppRouter = typeof appRouter;
