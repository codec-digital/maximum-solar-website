<script lang="ts">
	import { page } from '$app/stores';

	// Define types for our props
	type SchemaType =
		| 'WebSite'
		| 'WebPage'
		| 'Article'
		| 'Product'
		| 'Organization'
		| 'Person'
		| 'LocalBusiness';

	// Component props with improved defaults
	export let title = 'Maximum Solar - Your Local Tasmanian Solar Company';
	export let description =
		'Tasmanian-owned solar experts offering high-quality installations in Hobart and beyond. Reduce bills and carbon footprint. Get a free quote for your home today.';
	export let keywords = '';
	export let canonical = $page.url.href;
	export let siteName = 'Maximum Solar';
	export let imageURL = '$lib/assets/images/hero.jpg';
	export let logo = '$lib/assets/images/logo-black.png';
	export let author = 'Maximum Solar';
	export let type: SchemaType = 'WebSite';
	export let name = 'Maximum Solar';
	export let index = true;
	export let twitter = true;
	export let openGraph = true;
	export let schemaOrg = true;
	export let socials: string[] = [];
	export let language = 'en';
	export let publishedTime: string | null = null;
	export let modifiedTime: string | null = null;
	export let preconnect: string[] = [];
	export let articleType: string | null = null;

	// Make image URLs absolute
	const absoluteImageURL = imageURL.startsWith('http')
		? imageURL
		: `${$page.url.origin}${imageURL}`;
	const absoluteLogoURL = logo.startsWith('http') ? logo : `${$page.url.origin}${logo}`;

	// Basic schema
	const baseSchema = {
		'@context': 'https://schema.org',
		'@type': type,
		name: name || siteName,
		url: $page.url.href,
		image: absoluteImageURL,
		description: description
	};

	// Extended schema based on type
	let schemaData = { ...baseSchema };

	// Add specific fields based on schema type
	if (type === 'Article') {
		schemaData = {
			...schemaData,
			headline: title,
			author: {
				'@type': 'Person',
				name: author
			},
			publisher: {
				'@type': 'Organization',
				name: siteName,
				logo: {
					'@type': 'ImageObject',
					url: absoluteLogoURL,
					width: 192,
					height: 192
				}
			},
			datePublished: publishedTime,
			dateModified: modifiedTime || publishedTime,
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': canonical
			},
			articleSection: articleType
		};
	} else if (type === 'WebSite' || type === 'WebPage') {
		schemaData = {
			...schemaData,
			publisher: {
				'@type': 'Organization',
				name: siteName,
				logo: {
					'@type': 'ImageObject',
					url: absoluteLogoURL,
					width: 192,
					height: 192
				}
			}
		};

		if (socials.length > 0) {
			schemaData.sameAs = socials;
		}
	} else if (type === 'Organization' || type === 'LocalBusiness') {
		schemaData = {
			...schemaData,
			logo: absoluteLogoURL
		};

		if (socials.length > 0) {
			schemaData.sameAs = socials;
		}
	}

	const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(schemaData)}${'<'}/script>`;
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<meta name="robots" content={index ? 'index, follow' : 'noindex'} />
	<title>{title || siteName}</title>
	<meta name="language" content={language} />
	<link rel="canonical" href={canonical} />

	{#if description}
		<meta name="description" content={description} />
	{/if}

	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	{#if author}
		<meta name="author" content={author} />
	{/if}

	<!-- Preconnect optimization -->
	{#each preconnect as domain}
		<link rel="preconnect" href={domain} crossorigin />
	{/each}

	<!-- Open Graph Meta Tags -->
	{#if openGraph}
		<meta property="og:site_name" content={siteName} />
		<meta property="og:url" content={$page.url.href} />
		<meta property="og:type" content={type === 'Article' ? 'article' : 'website'} />
		<meta property="og:title" content={title || siteName} />

		{#if description}
			<meta property="og:description" content={description} />
		{/if}

		{#if absoluteImageURL}
			<meta property="og:image" content={absoluteImageURL} />
			<meta property="og:image:alt" content={title || siteName} />
		{/if}

		{#if type === 'Article' && publishedTime}
			<meta property="article:published_time" content={publishedTime} />
			{#if modifiedTime}
				<meta property="article:modified_time" content={modifiedTime} />
			{/if}
			{#if articleType}
				<meta property="article:section" content={articleType} />
			{/if}
		{/if}
	{/if}

	<!-- Twitter Card Meta Tags -->
	{#if twitter}
		<meta name="twitter:card" content="summary_large_image" />
		<meta property="twitter:domain" content={$page.url.host} />
		<meta property="twitter:url" content={$page.url.href} />
		<meta name="twitter:title" content={title || siteName} />

		{#if description}
			<meta name="twitter:description" content={description} />
		{/if}

		{#if absoluteImageURL}
			<meta name="twitter:image" content={absoluteImageURL} />
		{/if}
	{/if}

	<!-- Additional slot for custom meta tags -->
	<slot />

	<!-- Schema.org structured data -->
	{#if schemaOrg}
		{@html jsonLdScript}
	{/if}
</svelte:head>
