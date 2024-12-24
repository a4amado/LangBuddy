import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { pusher } from "~/server/pusher/client";

export async function POST(request: NextRequest) {
    const user = await auth();
    if (!user?.user?.id) {
        return new NextResponse(null, { status: 405 });
    }

    const body = await request.json();
    const socketId = body.socket_id;

    const authResponse = pusher.authenticateUser(socketId, {
        id: user.user.id,
    });

    return NextResponse.json(authResponse);
}
