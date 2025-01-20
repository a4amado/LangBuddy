import Pusher from "pusher";
import { env } from "~/env";

export const pusher = new Pusher({
    appId: "1915818",
    key: env.NEXT_PUBLIC_PUSHER_KEY,
    secret: env.PUSHER_SECRET,
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
});
