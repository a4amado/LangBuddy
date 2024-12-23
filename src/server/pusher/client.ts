import Pusher from "pusher";

export const pusher = new Pusher({
    appId: "1915818",
    key: "e52b6be16531b104cc75",
    secret: "2e2d881e907938b8b398",
    cluster: "eu",
    useTLS: true,
});
