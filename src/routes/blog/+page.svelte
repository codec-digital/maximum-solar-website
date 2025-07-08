<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowRight } from '@lucide/svelte';

	export let data;

	const seo = {
		title: 'Maximum Solar | Blog',
		description:
			"Stay up to date with the latest news and updates from Maximum Solar. We're Tasmania's leading solar power provider, and we're here to help you save money and reduce your carbon footprint."
	};
</script>

<SEO title={seo.title} description={seo.description} />

<section
	id="about"
	class="mx-auto flex items-center justify-center bg-[#236EA4] px-4 py-12 text-white"
>
	<div class="container mx-auto flex max-w-7xl flex-col items-center justify-center py-24 sm:py-32">
		<div class="max-w-2xl">
			<h1
				class="font-heading mx-auto mt-10 max-w-3xl text-center text-4xl font-semibold text-white sm:text-6xl"
			>
				Maximum Solar Blog
			</h1>
			<p class="mx-auto mt-10 max-w-3xl text-center text-base font-bold text-white lg:text-lg">
				Stay up to date with the latest news and updates from Maximum Solar. We're Tasmania's
				leading solar power provider, and we're here to help you save money and reduce your carbon
				footprint.
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
			{#each data.posts as post}
				<a href="/blog/{post.slug}" class="flex flex-col items-start justify-between">
					<Card.Root className="">
						<div class="relative w-full">
							<img
								src={post.image}
								alt={post.imageAlt}
								class="aspect-[16/9] w-full rounded-none object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
							/>
							<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
						</div>
						<div class="max-w-xl">
							<div class=" flex items-center gap-x-4 text-sm">
								<time datetime={post.publishedAt} class="text-white">
									{new Date(post.publishedAt).toLocaleDateString('en-AU', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							</div>
							<div class="group relative">
								<h3 class="font-heading mt-3 text-lg leading-10 text-white lg:text-3xl">
									{post.title}
								</h3>
								<p class="mt-5 line-clamp-3 text-base leading-6 text-white">
									{post.description}
								</p>
							</div>
						</div>
					</Card.Root>
				</a>
			{/each}
		</div>
	</div>
</section>
