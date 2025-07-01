<script>
	import { Phone, Facebook, Instagram, Linkedin, ArrowRight } from '@lucide/svelte';
	import MailingList from './MailingList.svelte';
	import Button from './ui/button/button.svelte';
</script>

<footer class="bg-black p-4">
	<div class="mx-auto max-w-screen-2xl border-b">
		<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-start md:justify-between lg:px-8">
			<div class="flex flex-col items-start justify-start">
				<p class="font-heading text-5xl text-[#FFC640]">Stay Updated</p>
				<p class="text-md/6 mt-8 mb-8 max-w-lg pb-4 text-white md:order-1">
					Sign up to be the first to find out about new deals, updates or important news in the
					industry.
				</p>
			</div>
			<div class=" flex w-full lg:w-80 lg:justify-end">
				<MailingList />
			</div>
		</div>
	</div>
	<div
		class="mx-auto max-w-7xl px-6 pt-12 md:flex md:items-start md:justify-between lg:px-8 lg:pb-12"
	>
		<div class="flex flex-col items-start justify-start">
			<p class="font-heading pb-8 text-5xl text-[#FFC640]">Contact</p>
			<Button
				href="mailto:info@maximumsolar.com.au"
				target="_blank"
				variant="link"
				class="pb-0 pl-0 text-white">info@maximumsolar.com.au</Button
			>
			<Button href="tel:1300457542" target="_blank" variant="link" class="pl-0 text-white"
				>1300 457 542</Button
			>
		</div>
		<div class="mt-12 flex w-full justify-center lg:mt-0 lg:justify-end">
			<enhanced:img
				src="/src/lib/assets/images/logo-transparent.png"
				alt="Maximum Solar Logo"
				class="h-32 w-auto"
			/>
		</div>
	</div>
	<div class="mx-auto max-w-7xl px-4 py-6 md:flex md:items-center md:justify-between lg:px-8">
		<div class="flex justify-center gap-x-6 md:order-2">
			<a target="_blank" href="tel:1300457542" class="text-white hover:text-[#FFC640]">
				<span class="sr-only">Phone</span>
				<Phone class="size-6" />
			</a>
			<a
				target="_blank"
				href="https://www.facebook.com/maximumsolaraus/"
				class="text-white hover:text-[#FFC640]"
			>
				<span class="sr-only">Facebook</span>
				<Facebook class="size-6" />
			</a>
			<a
				target="_blank"
				href="https://www.instagram.com/maximumsolaraustralia"
				class="text-white hover:text-[#FFC640]"
			>
				<span class="sr-only">Instagram</span>
				<Instagram class="size-6" />
			</a>
			<a
				target="_blank"
				href="https://au.linkedin.com/in/maximum-solar-64b12b299"
				class="text-white hover:text-[#FFC640]"
			>
				<span class="sr-only">LinkedIn</span>
				<Linkedin class="size-6" />
			</a>
		</div>
		<p class="mt-8 text-center text-sm/6 text-white md:order-1 md:mt-0">
			&copy; 2025 <a href="https://www.maximumsolar.com.au/" target="_blank" class="underline"
				>Maximum Solar.</a
			>
			All rights reserved.
		</p>
	</div>
</footer>
