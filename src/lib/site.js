// Canonical production origin for the site. Single source of truth for all
// absolute URLs (canonical tags, Open Graph, Twitter, schema.org, sitemap).
//
// IMPORTANT: do not derive the origin from `$page.url` in prerendered pages —
// during prerendering SvelteKit uses the placeholder host `http://sveltekit-prerender`,
// which then gets baked into the static HTML. Always build absolute URLs from
// SITE_URL + the request pathname instead.
//
// No trailing slash; paths are joined as `${SITE_URL}${pathname}`.
export const SITE_URL = 'https://www.maximumsolar.com.au';
