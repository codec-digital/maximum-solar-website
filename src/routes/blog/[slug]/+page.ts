import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	const modules = import.meta.glob('/src/posts/*.md');

	let post;

	for (const path in modules) {
		if (path.includes(params.slug)) {
			const resolvedPost = (await modules[path]()) as App.MdsvexFile;
			post = {
				...resolvedPost.metadata,
				content: resolvedPost.default
			};
		}
	}

	if (post) {
		return {
			post
		};
	}

	throw error(404, 'Not found');
};
