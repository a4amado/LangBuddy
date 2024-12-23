import { NextApiHandler } from "next";
import { auth } from "~/server/auth";
import { pusher } from "~/server/pusher/client";

export const POST: NextApiHandler = async (req, res) => {
    const user = await auth();
    if (!user?.user?.id) {
        res.status(405).end();
    }
    const socketId = req.body.socket_id;
  

    const authResponse = pusher.authenticateUser(socketId, {
        id: user?.user?.id ?? ""
    });
    res.send(authResponse);
  }