import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pusher } from "~/lib/pusher";
import { is_user_a_part_of_this_chat } from "~/utils/is_user_a_part_of_this_chat";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

const MessageSchema = z.object({
  chatId: z.string(),
  content: z.string().min(1),
});

const ChatSchema = z.object({
  userId: z.string(),
  type: z.enum(["DIRECT", "GROUP"]).default("DIRECT"),
  name: z.string().optional(),
});

export const chatRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ChatSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.type === "DIRECT") {
        const existingChat = await db.chat.findFirst({
          where: {
            type: "DIRECT",
            members: {
              every: {
                userId: {
                  in: [ctx.session.user.id, input.userId],
                },
              },
            },
          },
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        });

        if (existingChat) return existingChat;
      }

      return db.chat.create({
        data: {
          type: input.type,
          
          members: {
            createMany: {
              data: input.type === "DIRECT" 
                ? [
                    { userId: ctx.session.user.id },
                    { userId: input.userId },
                  ]
                : [{ userId: ctx.session.user.id }],
            },
          },
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const chats = await db.chat.findMany({
      where: {
        members: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        messages: {
          take: 50,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

 
    type ChatType = typeof chats;


    // Shape for Redux state
    const state =  {
      state: "idle",
      chats: chats.map(chat => ({
        id: chat.id,
        type: chat.type,
        members: chat.members.map(member => member.user),
        lastMessage: chat.messages[0] || null,
        updatedAt: chat.updatedAt,
      })),
      messages: {} as Record<string,ChatType[0]["messages"]>,
      active: "",
    };
    chats.forEach((val, idx) => {
      state.messages[val.id.toString()] =  val.messages
    })
    return state
  }),

  getMessages: protectedProcedure
    .input(z.object({ 
      chatId: z.string(),
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      if (!await is_user_a_part_of_this_chat({ 
        chat_id: input.chatId, 
        user_id: ctx.session.user.id
      })) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const messages = await db.message.findMany({
        where: { chatId: input.chatId },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (messages.length > input.limit) {
        messages.pop();
        nextCursor = messages.pop()?.id ?? undefined
      }

      return {
        messages,
        nextCursor,
      };
    }),

  sendMessage: protectedProcedure
    .input(MessageSchema)
    .mutation(async ({ ctx, input }) => {
      if (!await is_user_a_part_of_this_chat({ 
        chat_id: input.chatId, 
        user_id: ctx.session.user.id
      })) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const message = await db.message.create({
        data: {
          content: input.content,
          chatId: input.chatId,
          senderId: ctx.session.user.id,
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      await db.chat.update({
        where: { id: input.chatId },
        data: {
          lastMessageId: message.id,
          updatedAt: new Date(),
        },
      });

      await pusher.trigger(`chat-${input.chatId}`, "new-message", message);
      return message;
    }),

  addMembers: protectedProcedure
    .input(z.object({
      chatId: z.string(),
      userIds: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      const chat = await db.chat.findUnique({
        where: { id: input.chatId },
        include: { members: true },
      });

      if (!chat) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (chat.type === "DIRECT") {
        throw new TRPCError({ 
          code: "BAD_REQUEST",
          message: "Cannot add members to direct chat" 
        });
      }


      return db.chat.update({
        where: { id: input.chatId },
        data: {
          members: {
            createMany: {
              data: input.userIds.map(userId => ({ userId })),
              skipDuplicates: true,
            },
          },
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    }),

  leaveChat: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return db.chatMember.delete({
        where: {
          chatId_userId: {
            chatId: input.chatId,
            userId: ctx.session.user.id,
          },
        },
      });
    })
});