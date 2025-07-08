import fs from 'fs';
import path from 'path';

const baseUrl = 'https://maximumsolar.com.au';
const pagesDir = path.resolve(process.cwd(), 'src/routes');
const postsDir = path.resolve(process.cwd(), 'src/posts');

function getPages() {
	const pages = [];
	const files = fs.readdirSync(pagesDir, { withFileTypes: true });

	files.forEach((file) => {
		if (file.isDirectory()) {
			const pagePath = path.join(pagesDir, file.name, '+page.svelte');
			if (fs.existsSync(pagePath)) {
				pages.push(`${baseUrl}/${file.name}`);
			}
		}
	});

	return pages;
}

function getPosts() {
	const posts = [];
	const files = fs.readdirSync(postsDir);

	files.forEach((file) => {
		if (path.extname(file) === '.md') {
			const slug = file.replace(/\.md$/, '');
			posts.push(`${baseUrl}/blog/${slug}`);
		}
	});

	return posts;
}

function generateSitemap() {
	const pages = getPages();
	const posts = getPosts();
	const urls = [...pages, ...posts];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
		.map(
			(url) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `
		)
		.join('')}
</urlset>
`;

	fs.writeFileSync(path.resolve(process.cwd(), 'static/sitemap.xml'), sitemap);
}

generateSitemap();
