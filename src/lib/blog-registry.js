// src/lib/blog-registry.js
// Simplified blog registry using proper glob imports

/**
 * Get all blog posts using Vite's glob import
 * @returns {Promise<any[]>} Array of blog post metadata with slugs
 */
export async function getAllPosts() {
	try {
		// Use Vite's glob import to dynamically import all markdown files
		const modules = /** @type {Record<string, any>} */ (
			import.meta.glob('/src/content/blog/*.md', { eager: true })
		);

		const posts = Object.entries(modules)
			.map(([path, module]) => {
				// Extract slug from file path
				const slug = path.split('/').pop()?.replace('.md', '');

				const mod = /** @type {any} */ (module);

				// Ensure module has metadata
				if (!mod?.metadata || !slug) {
					return null;
				}

				return {
					...mod.metadata,
					slug,
					Component: mod.default,
					// Ensure we have default values for missing fields
					title: mod.metadata.title || 'Untitled Post',
					description: mod.metadata.description || '',
					publishedAt: mod.metadata.publishedAt || new Date().toISOString(),
					author: mod.metadata.author || 'Maximum Solar Team',
					tags: Array.isArray(mod.metadata.tags) ? mod.metadata.tags : [],
					categories: Array.isArray(mod.metadata.categories) ? mod.metadata.categories : [],
					image: mod.metadata.image || '',
					imageAlt: mod.metadata.imageAlt || '',
					draft: mod.metadata.draft || false,
					featured: mod.metadata.featured || false
				};
			})
			.filter((post) => post !== null && !post.draft) // Filter out null posts and drafts
			.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()); // Sort by date, newest first

		return posts;
	} catch (error) {
		console.error('Error loading blog posts:', error);
		return [];
	}
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The post slug
 * @returns {Promise<Object|null>} Blog post data or null if not found
 */
export async function getPostBySlug(slug) {
	try {
		const allPosts = await getAllPosts();
		return allPosts.find((post) => post.slug === slug) || null;
	} catch (error) {
		console.error(`Error loading blog post ${slug}:`, error);
		return null;
	}
}

/**
 * Get related posts based on tags
 * @param {string} currentSlug - Current post slug to exclude
 * @param {string[]} tags - Tags to match against
 * @param {number} limit - Maximum number of posts to return
 * @returns {Promise<any[]>} Array of related posts
 */
export async function getRelatedPosts(currentSlug, tags = [], limit = 3) {
	try {
		const allPosts = await getAllPosts();

		// Filter out current post and find posts with matching tags
		const relatedPosts = allPosts
			.filter((post) => post.slug !== currentSlug)
			.filter((post) => {
				if (!Array.isArray(tags) || tags.length === 0) return false;
				return tags.some((tag) => post.tags.includes(tag));
			})
			.slice(0, limit);

		// If we don't have enough related posts, fill with recent posts
		if (relatedPosts.length < limit) {
			const recentPosts = allPosts
				.filter((post) => post.slug !== currentSlug)
				.filter((post) => !relatedPosts.some((related) => related.slug === post.slug))
				.slice(0, limit - relatedPosts.length);

			relatedPosts.push(...recentPosts);
		}

		return relatedPosts;
	} catch (error) {
		console.error('Error getting related posts:', error);
		return [];
	}
}

/**
 * Get featured posts
 * @param {number} limit - Maximum number of posts to return
 * @returns {Promise<any[]>} Array of featured posts
 */
export async function getFeaturedPosts(limit = 3) {
	try {
		const allPosts = await getAllPosts();
		return allPosts.filter((post) => post.featured).slice(0, limit);
	} catch (error) {
		console.error('Error getting featured posts:', error);
		return [];
	}
}

/**
 * Get posts by category
 * @param {string} category - Category to filter by
 * @returns {Promise<any[]>} Array of posts in the category
 */
export async function getPostsByCategory(/** @type {string} */ category) {
	try {
		const allPosts = await getAllPosts();
		return allPosts.filter((post) => post.categories.includes(category));
	} catch (error) {
		console.error('Error getting posts by category:', error);
		return [];
	}
}

/**
 * Get posts by tag
 * @param {string} tag - Tag to filter by
 * @returns {Promise<any[]>} Array of posts with the tag
 */
export async function getPostsByTag(/** @type {string} */ tag) {
	try {
		const allPosts = await getAllPosts();
		return allPosts.filter((post) => post.tags.includes(tag));
	} catch (error) {
		console.error('Error getting posts by tag:', error);
		return [];
	}
}

/**
 * Get all unique categories
 * @returns {Promise<string[]>} Array of unique categories
 */
export async function getAllCategories() {
	try {
		const allPosts = await getAllPosts();
		const categories = new Set();

		allPosts.forEach((post) => {
			post.categories.forEach((/** @type {string} */ category) => categories.add(category));
		});

		return Array.from(categories).sort();
	} catch (error) {
		console.error('Error getting categories:', error);
		return [];
	}
}

/**
 * Get all unique tags
 * @returns {Promise<string[]>} Array of unique tags
 */
export async function getAllTags() {
	try {
		const allPosts = await getAllPosts();
		const tags = new Set();

		allPosts.forEach((post) => {
			post.tags.forEach((/** @type {string} */ tag) => tags.add(tag));
		});

		return Array.from(tags).sort();
	} catch (error) {
		console.error('Error getting tags:', error);
		return [];
	}
}

/**
 * Calculate reading time for content
 * @param {string} content - The content to calculate reading time for
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(content) {
	if (!content || typeof content !== 'string') {
		return 5; // Default reading time
	}

	const wordsPerMinute = 200;
	const words = content
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;

	const readingTime = Math.ceil(words / wordsPerMinute);
	return Math.max(1, readingTime); // Minimum 1 minute
}
