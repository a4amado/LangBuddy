"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function StartChat({ user_id }: { user_id: string }) {
    const router = useRouter();
    const start = api.chat.create.useMutation({
        onSuccess(data) {
            router.push(`/chat?id=${data.id}`);
        },
    });

    return (
        <Button
            loading={start.status == "pending"}
            onClick={() => start.mutate({ userId: user_id })}
        >
            Start Char
        </Button>
    );
}
