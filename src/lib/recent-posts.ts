// Lightweight list of the most recent blog posts for use in the navigation.
// Uses `import: 'metadata'` so only each post's frontmatter is bundled, not the
// compiled mdsvex component. Posts live in /src/posts/*.md (see blog/+page.ts).

type PostMeta = {
	title: string;
	publishedAt: string;
	image?: string;
	imageAlt?: string;
};

export type RecentPost = PostMeta & { slug: string };

const modules = import.meta.glob('/src/posts/*.md', {
	eager: true,
	import: 'metadata'
}) as Record<string, PostMeta>;

export const recentPosts: RecentPost[] = Object.entries(modules)
	.map(([path, metadata]) => ({
		...metadata,
		slug: path.split('/').pop()!.slice(0, -3)
	}))
	.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
	.slice(0, 3);
