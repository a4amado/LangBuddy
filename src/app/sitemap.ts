import { MetadataRoute } from "next";
import { db } from "~/server/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await db.post.findMany();

    return posts.map((post) => ({
        url: `${process.env.NEXT_PUBLIC_URL}/posts/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
    }));
}
