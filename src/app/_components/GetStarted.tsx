import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function GetStarted() {
    const session = useSession();

    if (session.status === "loading") {
        return (
            <div className="flex justify-center items-center border">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (session.status === "authenticated") {
        return (
            <Link
                href="/home"
                className="bg-blue-600 border justify-center hover:bg-blue-700 flex items-center gap-2 px-6 py-2 text-white rounded-full"
            >
                <Image
                    className="rounded-full"
                    alt={`${session.data.user.name}'s profile picture`}
                    src={session.data.user.image || "/default-avatar.png"}
                    width={30}
                    height={30}
                />
                <span>Hello, {session.data.user.name}</span>
            </Link>
        );
    }

    return (
        <button
            onClick={() => signIn("google")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
        >
            Get Started
        </button>
    );
}
