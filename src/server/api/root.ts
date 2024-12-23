import { createTRPCRouter } from "./trpc";
import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { chatRouter } from "./routers/chat";

export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
