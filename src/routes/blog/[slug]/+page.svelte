<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	export let data;

	const seo = {
		title: `Maximum Solar | ${data.post.title}`,
		description: data.post.description
	};
</script>

<SEO title={seo.title} description={seo.description} />

<section
	id="about"
	class="mx-auto flex items-center justify-center bg-[#236EA4] px-4 pb-12 text-white"
>
	<div class="container py-48">
		<div class="mx-auto max-w-5xl">
			<div class=" pb-16">
				<div class="max-w-5xl">
					<p class="text-primary-600 text-base leading-7 font-semibold">
						{new Date(data.post.publishedAt).toLocaleDateString('en-AU', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
					<h1 class="font-heading mt-2 text-3xl text-white sm:text-6xl">
						{data.post.title}
					</h1>
					<p class="mt-6 text-xl leading-8 text-white">
						{data.post.description}
					</p>
					<p class="mt-6 text-sm leading-8 text-white">
						By {data.post.author}
					</p>
				</div>
				{#if data.post.image}
					<div class="aspect-h-9 aspect-w-16 mt-10 w-full">
						<img
							src={data.post.image}
							alt={data.post.imageAlt}
							class="w-full bg-gray-100 object-cover"
						/>
					</div>
				{/if}
			</div>

			<div class="prose mt-8">
				<svelte:component this={data.post.content} />
			</div>
		</div>
	</div>
</section>
