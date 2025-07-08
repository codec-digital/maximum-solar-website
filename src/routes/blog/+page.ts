import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async () => {
	const modules = import.meta.glob('/src/posts/*.md');

	const posts = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const resolvedPost = (await resolver()) as App.MdsvexFile;
			const slug = path.split('/').pop()?.slice(0, -3);

			return { ...resolvedPost.metadata, slug };
		})
	);

	const sortedPosts = posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

	if (sortedPosts) {
		return {
			posts: sortedPosts
		};
	}

	throw error(404, 'Not found');
};
