import { Suspense } from "react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

import { PostFeed } from "@/components/posts/post-feed";
import { UserSuggestions } from "@/components/users/user-suggestions";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingSpinner } from "@/components/ui/loading";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader
        heading="Home"
        subheading="See what other language learners are up to"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Suspense fallback={<LoadingSpinner />}>
            <PostFeed />
          </Suspense>
        </div>
        
        <aside className="hidden md:block">
          <Suspense fallback={<LoadingSpinner />}>
            <UserSuggestions />
          </Suspense>
        </aside>
      </div>
    </main>
  );
}
