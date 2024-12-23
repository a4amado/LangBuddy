"use client";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { PostCard } from "./post-card";
import { LoadingSpinner } from "@/components/ui/loading";

export function PostFeed() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = api.post.getInfinitePosts.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data?.pages[0].items.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12">
        <h3 className="text-2xl font-semibold">No posts yet</h3>
        <p className="text-muted-foreground">Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.pages.map((page) =>
        page.items.map((post) => (
          <PostCard key={post.id} post={post} />
        )),
      )}
      
      {hasNextPage && (
        <div ref={ref} className="flex justify-center p-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
} 