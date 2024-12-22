import { createCallerFactory, createTRPCRouter } from "./trpc";
import { chatRouter } from "./routers/chat";
import { userRouter } from "./routers/user";
import { languageRouter } from "./routers/language";
import { messageRouter } from "./routers/message";
import { chatMemberRouter } from "./routers/chatMember";
import { onBoardingRouter } from "./routers/onboarding";
import { latestSeenRouter } from "./routers/latest-seen";
import { postRoute } from "./routers/post";

export const appRouter = createTRPCRouter({
    chat: chatRouter,
    user: userRouter,
    language: languageRouter,
    message: messageRouter,
    chatMember: chatMemberRouter,
    boarding: onBoardingRouter,
    seen: latestSeenRouter,
    post: postRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
