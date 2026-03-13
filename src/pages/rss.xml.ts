import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).sort((a, b) => {
    const dateDiff = b.data.date.valueOf() - a.data.date.valueOf();
    if (dateDiff !== 0) return dateDiff;
    return b.data.priority - a.data.priority;
  });

  return rss({
    title: "Misrule",
    description: "愿我们纵然置身当下，仍能寻得清醒。 ",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.id}`,
    })),
  });
}
