<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import {
		Phone,
		ChevronDown,
		ArrowRight,
		Wrench,
		ClipboardCheck,
		CalendarCheck,
		House,
		BatteryCharging,
		Power,
		Tractor,
		PlugZap,
		Banknote
	} from '@lucide/svelte';
	import { Sheet, SheetTrigger, SheetContent } from '$lib/components/ui/sheet';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { recentPosts } from '$lib/recent-posts';

	const maintenanceServices = [
		{ name: 'System Inspections', href: '/system-inspections', icon: ClipboardCheck },
		{ name: 'Maintenance Plans', href: '/maintenance-plans', icon: CalendarCheck },
		{ name: 'Home Maintenance', href: '/home-maintenance', icon: House },
		{ name: 'Solar Maintenance', href: '/solar-maintenance', icon: Wrench }
	];
	const otherServices = [
		{ name: 'Battery Storage', href: '/battery-storage', icon: BatteryCharging },
		{ name: 'Off-Grid Solar', href: '/off-grid-solar-tasmania', icon: Power },
		{ name: 'Farm & Rural Solar', href: '/farm-solar-tasmania', icon: Tractor },
		{ name: 'EV Charging', href: '/ev-charging-solar', icon: PlugZap },
		{ name: 'Solar Rebates', href: '/solar-rebates-tasmania', icon: Banknote }
	];

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-AU', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	type Menu = 'services' | 'about' | 'articles' | null;
	let activeMenu = $state<Menu>(null);
	let sheetOpen = $state(false);

	// Width of each open panel (must match the w-[…px] on the panels below).
	// The container width animates between the collapsed pill width and these.
	const menuWidths: Record<Exclude<Menu, null>, number> = {
		services: 720,
		about: 720,
		articles: 720
	};

	// Measured natural width of the collapsed trigger row, used as the target
	// width when no menu is open so the container can transition back to it.
	let triggerWidth = $state(0);
	let mounted = $state(false);
	onMount(() => (mounted = true));

	const targetWidth = $derived(activeMenu ? menuWidths[activeMenu] : triggerWidth);
</script>

<header class="absolute inset-x-0 top-0 z-40 mx-auto max-w-screen-2xl">
	<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Maximum Solar</span>
				<enhanced:img
					src="/src/lib/assets/images/logo-black.png"
					alt="Maximum Solar"
					class="absolute top-4 h-36 w-36"
				/>
			</a>
		</div>

		<!-- Mobile menu button -->
		<div class="flex lg:hidden">
			<Sheet bind:open={sheetOpen}>
				<SheetTrigger>
					<button
						type="button"
						class="-m-2.5 inline-flex cursor-pointer items-center justify-center rounded-full bg-black p-2.5 text-[#FFC640]"
					>
						<span class="sr-only">Open main menu</span>
						<svg
							class="size-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button>
				</SheetTrigger>
				<SheetContent
					side="right"
					class="flex flex-col overflow-y-auto bg-black p-6 text-white"
					style="border-left: none;"
				>
					<!-- Phone button at the top of mobile nav -->
					<div class="mt-12 flex justify-end">
						<a
							href="tel:1300457542"
							class="flex items-center gap-3 text-xl font-semibold text-white transition"
						>
							<div
								class="font-heading flex items-center justify-center rounded-full bg-[#FFC640] p-2"
							>
								<Phone class="h-5 w-5 fill-black text-black" />
							</div>
							<span class="font-heading font-semibold underline">1300 457 542</span>
						</a>
					</div>

					<!-- Navigation links -->
					<div class="font-heading flex flex-col text-right">
						<Accordion.Root type="single">
							<Accordion.Item value="services">
								<Accordion.Trigger
									class="flex flex-row-reverse items-center justify-start text-right text-lg"
									>Services</Accordion.Trigger
								>
								<Accordion.Content class="mr-2 flex flex-col gap-4 text-lg">
									<a
										href="/residential-solar"
										class="hover:underline"
										onclick={() => (sheetOpen = false)}>Residential Solar</a
									>
									<a
										href="/commercial-solar"
										class="hover:underline"
										onclick={() => (sheetOpen = false)}>Commercial Solar</a
									>
									<Accordion.Root type="single">
										<Accordion.Item value="maintenance">
											<Accordion.Trigger
												class="flex flex-row-reverse items-center justify-start text-right text-lg"
												>Maintenance</Accordion.Trigger
											>
											<Accordion.Content class="mr-2 flex flex-col gap-4 text-lg">
												{#each maintenanceServices as s (s.href)}
													<a
														href={s.href}
														class="hover:underline"
														onclick={() => (sheetOpen = false)}>{s.name}</a
													>
												{/each}
											</Accordion.Content>
										</Accordion.Item>
									</Accordion.Root>
									<Accordion.Root type="single">
										<Accordion.Item value="other">
											<Accordion.Trigger
												class="flex flex-row-reverse items-center justify-start text-right text-lg"
												>Other Services</Accordion.Trigger
											>
											<Accordion.Content class="mr-2 flex flex-col gap-4 text-lg">
												{#each otherServices as s (s.href)}
													<a
														href={s.href}
														class="hover:underline"
														onclick={() => (sheetOpen = false)}>{s.name}</a
													>
												{/each}
											</Accordion.Content>
										</Accordion.Item>
									</Accordion.Root>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
						<Accordion.Root type="single">
							<Accordion.Item value="about">
								<Accordion.Trigger
									class="flex flex-row-reverse items-center justify-start text-right text-lg"
									>About</Accordion.Trigger
								>
								<Accordion.Content class="mr-2 flex flex-col gap-4 text-lg">
									<a
										href="/the-process"
										class="hover:underline"
										onclick={() => (sheetOpen = false)}>The Process</a
									>
									<a
										href="/financial-incentives"
										class="hover:underline"
										onclick={() => (sheetOpen = false)}>Financial Incentives</a
									>
									<a href="/careers" class="hover:underline" onclick={() => (sheetOpen = false)}
										>Careers</a
									>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
						<a
							href="/blog"
							class="mt-3 text-lg hover:underline"
							onclick={() => (sheetOpen = false)}>Articles</a
						>
						<a href="/faq" class="mt-6 text-lg hover:underline" onclick={() => (sheetOpen = false)}
							>FAQ</a
						>
						<a
							href="/contact"
							class="mt-6 text-lg hover:underline"
							onclick={() => (sheetOpen = false)}>Contact</a
						>
					</div>

					<!-- Logo positioned halfway between nav links and bottom -->
					<div class="mt-auto mb-auto flex justify-center pt-12">
						<enhanced:img
							src="/src/lib/assets/images/logo-black.png"
							alt="Maximum Solar Logo"
							class="h-36 w-36"
						/>
					</div>

					<div class="h-12"></div>
				</SheetContent>
			</Sheet>
		</div>

		<!-- Contact (desktop, right) -->
		<div class="hidden lg:flex lg:flex-1 lg:justify-end">
			<a
				href="tel:1300457542"
				class="flex items-center gap-3 text-2xl font-semibold text-white transition"
			>
				<div class="font-heading flex items-center justify-center rounded-full bg-[#FFC640] p-2">
					<Phone class="h-6 w-6 fill-black text-black" />
				</div>
				<span class="font-heading font-semibold underline">1300 457 542</span>
			</a>
		</div>
	</nav>
</header>

<!-- Desktop centre nav — fixed pill that stays at the top of the screen -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<nav
	onmouseleave={() => (activeMenu = null)}
	class="font-heading pointer-events-auto fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 lg:block"
>
	<div
		class="relative flex flex-col items-center overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-white/10 {mounted
			? 'transition-[width] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]'
			: ''}"
		style={triggerWidth ? `width:${targetWidth}px` : ''}
	>
		<div bind:clientWidth={triggerWidth} class="flex w-max items-center justify-center gap-1 p-1.5">
			<button
				onmouseenter={() => (activeMenu = 'services')}
				onclick={() => (activeMenu = activeMenu === 'services' ? null : 'services')}
				class="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm text-white transition hover:bg-white/10 {activeMenu ===
				'services'
					? 'bg-white/10'
					: ''}"
			>
				Services
				<ChevronDown
					class="size-4 transition-transform {activeMenu === 'services' ? 'rotate-180' : ''}"
				/>
			</button>
			<button
				onmouseenter={() => (activeMenu = 'about')}
				onclick={() => (activeMenu = activeMenu === 'about' ? null : 'about')}
				class="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm text-white transition hover:bg-white/10 {activeMenu ===
				'about'
					? 'bg-white/10'
					: ''}"
			>
				About
				<ChevronDown
					class="size-4 transition-transform {activeMenu === 'about' ? 'rotate-180' : ''}"
				/>
			</button>
			<a
				href="/blog"
				onmouseenter={() => (activeMenu = 'articles')}
				class="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm text-white transition hover:bg-white/10 {activeMenu ===
				'articles'
					? 'bg-white/10'
					: ''}"
			>
				Articles
				<ChevronDown
					class="size-4 transition-transform {activeMenu === 'articles' ? 'rotate-180' : ''}"
				/>
			</a>
			<a
				href="/faq"
				onmouseenter={() => (activeMenu = null)}
				class="rounded-xl px-4 py-2 text-sm text-white transition hover:bg-white/10">FAQ</a
			>
			<a
				href="/contact"
				onmouseenter={() => (activeMenu = null)}
				class="rounded-xl px-4 py-2 text-sm text-white transition hover:bg-white/10">Contact</a
			>

			<div class="mx-1 h-6 w-px bg-white/20"></div>

			<a
				href="/"
				aria-label="Home"
				onmouseenter={() => (activeMenu = null)}
				class="flex items-center justify-center rounded-xl px-3 py-2 text-white transition hover:bg-white/10"
			>
				<House class="size-5" />
			</a>
		</div>

		{#if activeMenu}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				transition:slide={{ duration: 200 }}
				onclick={() => (activeMenu = null)}
				class="border-t border-white/10"
			>
				{#if activeMenu === 'services'}
					<div class="w-[720px] p-5">
						<!-- Primary: Residential / Commercial image cards -->
						<div class="grid grid-cols-2 gap-4">
							<a href="/residential-solar" class="group relative block overflow-hidden rounded-xl">
								<enhanced:img
									src="/src/lib/assets/images/residential-solar-1.jpg"
									alt="Residential Solar"
									class="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
								<span class="absolute bottom-3 left-4 text-lg font-semibold text-white"
									>Residential Solar</span
								>
							</a>
							<a href="/commercial-solar" class="group relative block overflow-hidden rounded-xl">
								<enhanced:img
									src="/src/lib/assets/images/commercial-solar.jpg"
									alt="Commercial Solar"
									class="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
								<span class="absolute bottom-3 left-4 text-lg font-semibold text-white"
									>Commercial Solar</span
								>
							</a>
						</div>

						<!-- Maintenance services -->
						<p
							class="mb-1 mt-5 border-t border-white/10 px-1 pt-4 text-xs font-semibold uppercase tracking-wider text-white/50"
						>
							Maintenance
						</p>
						<div class="grid grid-cols-4 gap-1">
							{#each maintenanceServices as s (s.href)}
								{@const Icon = s.icon}
								<a
									href={s.href}
									class="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
								>
									<Icon class="size-4 shrink-0 text-[#FFC640]" />
									{s.name}
								</a>
							{/each}
						</div>

						<!-- Other services -->
						<p
							class="mb-1 mt-3 border-t border-white/10 px-1 pt-4 text-xs font-semibold uppercase tracking-wider text-white/50"
						>
							Other Services
						</p>
						<div class="grid grid-cols-4 gap-1">
							{#each otherServices as s (s.href)}
								{@const Icon = s.icon}
								<a
									href={s.href}
									class="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
								>
									<Icon class="size-4 shrink-0 text-[#FFC640]" />
									{s.name}
								</a>
							{/each}
						</div>
					</div>
				{:else if activeMenu === 'about'}
					<div class="w-[720px] p-5">
						<div class="grid grid-cols-3 gap-4">
							<a href="/the-process" class="group relative block overflow-hidden rounded-xl">
								<enhanced:img
									src="/src/lib/assets/images/the-process.jpg"
									alt="The Process"
									class="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
								<span class="absolute bottom-3 left-4 text-lg font-semibold text-white">The Process</span>
							</a>
							<a href="/financial-incentives" class="group relative block overflow-hidden rounded-xl">
								<enhanced:img
									src="/src/lib/assets/images/financial-incentives.jpg"
									alt="Financial Incentives"
									class="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
								<span class="absolute bottom-3 left-4 text-lg font-semibold text-white"
									>Financial Incentives</span
								>
							</a>
							<a href="/careers" class="group relative block overflow-hidden rounded-xl">
								<enhanced:img
									src="/src/lib/assets/images/careers.jpg"
									alt="Careers"
									class="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
								<span class="absolute bottom-3 left-4 text-lg font-semibold text-white">Careers</span>
							</a>
						</div>
					</div>
				{:else if activeMenu === 'articles'}
					<div class="w-[720px] p-5">
						<div class="grid grid-cols-3 gap-4">
							{#each recentPosts as post (post.slug)}
								<a href="/blog/{post.slug}" class="group block">
									<div class="relative overflow-hidden rounded-xl">
										<img
											src={post.image}
											alt={post.imageAlt ?? post.title}
											class="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
										/>
										<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
										<span
											class="absolute inset-x-4 bottom-3 line-clamp-2 text-sm font-semibold text-white"
											>{post.title}</span
										>
									</div>
									<p class="mt-2 text-xs text-white/50">{formatDate(post.publishedAt)}</p>
								</a>
							{/each}
						</div>
						<a
							href="/blog"
							class="mt-2 flex items-center gap-2 border-t border-white/10 px-2 py-3 text-sm font-semibold text-white transition hover:text-[#FFC640]"
						>
							View all articles <ArrowRight class="size-4" />
						</a>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</nav>
