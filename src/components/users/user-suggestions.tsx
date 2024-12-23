"use client";

import Image from "next/image";
import Link from "next/link";
import { api } from "@/trpc/react";
import { LoadingSpinner } from "@/components/ui/loading";

export function UserSuggestions() {
  const { data: users, isLoading } = api.user.getRecommended.useQuery(
    { limit: 5 },
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!users?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="font-semibold mb-4">Suggested Partners</h3>
      
      <div className="space-y-4">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/profile/${user.id}`}
            className="flex items-center gap-3 hover:bg-accent p-2 rounded-lg transition-colors"
          >
            {user.image && (
              <Image
                src={user.image}
                alt={user.name ?? "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name}</p>
              {user.languages?.length > 0 && (
                <p className="text-sm text-muted-foreground truncate">
                  {user.languages.map((l) => l.language).join(", ")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 