<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';

	const lastUpdated = '6 August 2026';

	const sections = [
		{ id: 'about-this-policy', title: 'About this policy' },
		{ id: 'information-we-collect', title: 'The information we collect' },
		{ id: 'how-we-collect', title: 'How we collect your information' },
		{ id: 'why-we-collect', title: 'Why we collect and use your information' },
		{ id: 'who-we-share-with', title: 'Who we share your information with' },
		{ id: 'overseas', title: 'Overseas disclosure' },
		{ id: 'cookies', title: 'Cookies and website analytics' },
		{ id: 'marketing', title: 'Direct marketing and opting out' },
		{ id: 'security', title: 'How we store and protect your information' },
		{ id: 'access-and-correction', title: 'Accessing and correcting your information' },
		{ id: 'complaints', title: 'Complaints' },
		{ id: 'other-websites', title: 'Links to other websites' },
		{ id: 'changes', title: 'Changes to this policy' },
		{ id: 'contact-us', title: 'Contact us' }
	];
</script>

<Seo
	title="Privacy Policy - Maximum Solar"
	description="How Maximum Solar collects, uses, stores and discloses your personal information, in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles."
	keywords="Maximum Solar privacy policy, privacy, personal information, Australian Privacy Principles, Privacy Act 1988"
	type="WebPage"
/>

<section class="relative flex w-full flex-col items-center justify-center bg-black pt-60 pb-20">
	<h1 class="font-heading relative z-10 px-6 text-center text-4xl text-white lg:text-6xl/24">
		Privacy Policy
	</h1>
	<p class="z-10 mt-6 px-6 text-center text-base text-gray-300">
		Last updated {lastUpdated}
	</p>
</section>

<section class="mx-auto max-w-4xl px-6 py-16 lg:py-24">
	<!-- Contents -->
	<nav aria-label="Contents" class="mb-16 rounded-2xl bg-zinc-100 px-6 py-8 sm:px-10">
		<h2 class="font-heading text-2xl">Contents</h2>
		<ol class="mt-6 grid list-decimal grid-cols-1 gap-2 pl-5 text-base sm:grid-cols-2">
			{#each sections as section (section.id)}
				<li>
					<a href="#{section.id}" class="underline underline-offset-2 hover:text-[#FFC640]">
						{section.title}
					</a>
				</li>
			{/each}
		</ol>
	</nav>

	<div class="text-lg leading-8">
		<h2 id="about-this-policy" class="font-heading scroll-mt-32 text-3xl sm:text-4xl">
			1. About this policy
		</h2>
		<p class="mt-6">
			Maximum Solar (“we”, “us”, “our”) is a Tasmanian-owned solar company supplying, installing and
			maintaining solar, battery and EV charging systems for homes, farms and businesses. We respect
			your privacy and are committed to protecting the personal information you share with us.
		</p>
		<p class="mt-6">
			This policy explains what personal information we collect, why we collect it, how we use and
			store it, and who we may share it with. It applies to our website, our forms and calculators,
			and to the quotes, installations and services we provide.
		</p>
		<p class="mt-6">
			We handle personal information in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian
			Privacy Principles (APPs). By using our website or providing us with your details, you agree to
			your personal information being handled as described in this policy.
		</p>

		<h2 id="information-we-collect" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			2. The information we collect
		</h2>
		<p class="mt-6">
			We only collect personal information that is reasonably necessary for our business. Depending
			on how you interact with us, this may include:
		</p>

		<h3 class="mt-10 text-xl font-semibold">Contact and enquiry details</h3>
		<ul class="mt-4 list-disc space-y-2 pl-8">
			<li>Your name, email address, phone number and postcode or suburb</li>
			<li>Your preferred method of contact and the content of your enquiry or message</li>
			<li>
				For business and builder enquiries, your company name and your position within that company
			</li>
		</ul>

		<h3 class="mt-10 text-xl font-semibold">Quote, design and installation information</h3>
		<ul class="mt-4 list-disc space-y-2 pl-8">
			<li>Your property address and details about your roof, switchboard and meter</li>
			<li>
				Photographs you send us of your roof, meter box or existing system, and copies of your
				electricity bills
			</li>
			<li>
				Your electricity retailer, NMI (National Meter Identifier), energy usage and tariff details
			</li>
			<li>
				Details of the system quoted, supplied, installed or serviced, including warranty, service
				and maintenance history
			</li>
			<li>Payment and billing details, and finance or payment plan information where applicable</li>
		</ul>

		<h3 class="mt-10 text-xl font-semibold">Solar savings calculator</h3>
		<p class="mt-4">
			If you use our online calculator, we collect the answers you provide — such as your location,
			household or business energy usage, bill range, property and occupancy details, appliance and
			EV plans, and battery interest — along with your name, email address and phone number if you
			choose to receive your results or a follow-up quote.
		</p>

		<h3 class="mt-10 text-xl font-semibold">Careers and recruitment</h3>
		<p class="mt-4">
			If you apply for a role with us, we collect your name, contact details, the areas of work you
			are interested in, and any information you include in your message, résumé or supporting
			documents.
		</p>

		<h3 class="mt-10 text-xl font-semibold">Mailing list</h3>
		<p class="mt-4">
			If you subscribe to our updates, we collect your email address and a record of your
			subscription.
		</p>

		<h3 class="mt-10 text-xl font-semibold">Website usage information</h3>
		<p class="mt-4">
			When you visit our website, we and our analytics providers may automatically collect technical
			information such as your IP address, browser and device type, operating system, referring
			website, the pages you view, and the dates and times of your visit. This information is used
			in aggregate to understand and improve how our website performs, and is generally not used to
			identify you personally.
		</p>

		<h3 class="mt-10 text-xl font-semibold">Sensitive information</h3>
		<p class="mt-4">
			We do not seek out sensitive information (such as health information) as part of our ordinary
			business. If we ever need to collect it — for example, workplace health and safety information
			relevant to an installation or a job application — we will only do so with your consent and
			where it is reasonably necessary.
		</p>

		<h3 class="mt-10 text-xl font-semibold">Dealing with us anonymously</h3>
		<p class="mt-4">
			You can browse our website and make general enquiries without identifying yourself. However,
			we usually cannot prepare a quote, apply for rebates or grid connection, or install and
			service a system without knowing who you are and where you are located.
		</p>

		<h2 id="how-we-collect" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			3. How we collect your information
		</h2>
		<p class="mt-6">We collect personal information:</p>
		<ul class="mt-4 list-disc space-y-2 pl-8">
			<li>
				Directly from you — through our website forms, calculator, phone calls, emails, SMS, social
				media messages, in-person consultations and site visits
			</li>
			<li>Automatically — through cookies and analytics when you use our website</li>
			<li>
				From third parties — such as referrals, builders or property owners arranging work on your
				behalf, your electricity retailer or distributor, finance providers, and publicly available
				sources
			</li>
		</ul>
		<p class="mt-6">
			Where we collect your information from someone else, we will take reasonable steps to let you
			know, unless it is impracticable or unnecessary to do so.
		</p>

		<h2 id="why-we-collect" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			4. Why we collect and use your information
		</h2>
		<p class="mt-6">We use your personal information to:</p>
		<ul class="mt-4 list-disc space-y-2 pl-8">
			<li>Respond to your enquiries and provide quotes, estimates and advice</li>
			<li>Design, supply, install, commission, service and repair your system</li>
			<li>
				Lodge and administer rebates, incentives and certificates (including small-scale technology
				certificates) and grid connection and metering applications on your behalf
			</li>
			<li>Arrange finance or payment plans where you have asked us to</li>
			<li>Process payments, issue invoices and manage our accounts</li>
			<li>Provide warranty support, maintenance plans, inspections and monitoring</li>
			<li>Meet our obligations under electrical safety, consumer, tax and other laws</li>
			<li>
				Send you updates, offers and industry news where you have asked us to, or would expect it
			</li>
			<li>Assess job applications and manage recruitment</li>
			<li>Improve our website, products, services and customer experience</li>
		</ul>
		<p class="mt-6">
			If we intend to use your information for a purpose other than the one it was collected for, we
			will only do so where that use is related to the original purpose and you would reasonably
			expect it, where you have consented, or where the law requires or permits it.
		</p>

		<h2 id="who-we-share-with" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			5. Who we share your information with
		</h2>
		<p class="mt-6">
			We do not sell your personal information. We may disclose it to the following, only as needed
			to deliver our services or meet our obligations:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-8">
			<li>
				Our employees, licensed electricians, accredited installers and subcontractors carrying out
				work at your property
			</li>
			<li>
				Electricity distributors and retailers (such as TasNetworks and your energy retailer) for
				grid connection, metering and feed-in arrangements
			</li>
			<li>
				The Clean Energy Regulator and certificate agents, for rebate, incentive and certificate
				claims
			</li>
			<li>
				Product manufacturers, suppliers and wholesalers, for warranty registration, warranty claims
				and parts
			</li>
			<li>Finance providers, where you have applied for finance or a payment plan through us</li>
			<li>
				Our service providers — including website hosting, email delivery, form handling, analytics,
				customer management, monitoring platforms, IT support, payment processing and accounting
			</li>
			<li>Our insurers, auditors, accountants and legal advisers</li>
			<li>
				Government agencies, regulators, courts and law enforcement, where required or authorised by
				law
			</li>
			<li>
				A purchaser or prospective purchaser, if our business or part of it is sold or transferred
			</li>
		</ul>
		<p class="mt-6">
			We require our service providers and contractors to protect your personal information and to
			use it only for the purpose we have engaged them for.
		</p>

		<h2 id="overseas" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			6. Overseas disclosure
		</h2>
		<p class="mt-6">
			Some of the technology providers we rely on — including our website hosting, email delivery,
			form handling and analytics providers — store or process data on servers located outside
			Australia, most commonly in the United States. By providing your information to us, you
			consent to it being disclosed to and stored by these providers overseas.
		</p>
		<p class="mt-6">
			We take reasonable steps to ensure these providers handle your information in a way consistent
			with the Australian Privacy Principles, but we may not be able to control or guarantee how
			information is handled once it is outside Australia.
		</p>

		<h2 id="cookies" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			7. Cookies and website analytics
		</h2>
		<p class="mt-6">
			Our website uses cookies and similar technologies — small files stored on your device — to
			keep the site working properly, remember your preferences and understand how the site is used.
		</p>
		<p class="mt-6">
			We use a product analytics service to measure things like page views, referral sources and how
			visitors move through the site. Our site also loads fonts and map tiles from third-party
			providers, which means those providers may receive your IP address when a page loads.
		</p>
		<p class="mt-6">
			You can set your browser to refuse or delete cookies, or to notify you when one is set. Some
			parts of our website may not work as intended if you do. Most browsers also offer a “Do Not
			Track” setting and private browsing mode.
		</p>

		<h2 id="marketing" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			8. Direct marketing and opting out
		</h2>
		<p class="mt-6">
			We may send you information about our products, services, offers and industry news by email,
			SMS, phone or post where you have asked us to, or where you are a customer and would
			reasonably expect to hear from us. We will always identify ourselves and give you a way to opt
			out.
		</p>
		<p class="mt-6">
			You can opt out at any time by using the unsubscribe link in any marketing email, replying to
			ask us to stop, or contacting us using the details below. We will action your request
			promptly. We may still need to contact you about a job, quote, warranty or service matter that
			is already underway.
		</p>

		<h2 id="security" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			9. How we store and protect your information
		</h2>
		<p class="mt-6">
			We hold personal information in secure electronic systems and, where relevant, in physical
			files. We take reasonable steps to protect it from misuse, interference, loss, and
			unauthorised access, modification or disclosure — including access controls, secure hosting,
			encrypted connections on our website, and limiting access to staff who need it to do their
			job.
		</p>
		<p class="mt-6">
			No method of transmitting or storing information is completely secure. While we work hard to
			protect your information, we cannot guarantee absolute security, and any information you send
			us over the internet is sent at your own risk.
		</p>
		<p class="mt-6">
			We keep personal information only for as long as we need it for the purposes described in this
			policy, or for as long as the law requires — for example, electrical safety, warranty, tax and
			consumer records. When it is no longer needed, we take reasonable steps to destroy it or
			de-identify it.
		</p>
		<p class="mt-6">
			If a data breach occurs that is likely to result in serious harm, we will respond in line with
			the Notifiable Data Breaches scheme and notify affected individuals and the Office of the
			Australian Information Commissioner where required.
		</p>

		<h2 id="access-and-correction" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			10. Accessing and correcting your information
		</h2>
		<p class="mt-6">
			You can ask us for a copy of the personal information we hold about you, and ask us to correct
			it if it is inaccurate, out of date, incomplete, irrelevant or misleading. Just contact us
			using the details below.
		</p>
		<p class="mt-6">
			We may need to verify your identity before we act on your request. We will respond within a
			reasonable time and, in most cases, provide access free of charge — though we may charge a
			reasonable fee for retrieving or copying large amounts of information. If we refuse access or
			a correction, we will explain why in writing and how you can complain about that decision.
		</p>

		<h2 id="complaints" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			11. Complaints
		</h2>
		<p class="mt-6">
			If you believe we have mishandled your personal information or breached the Australian Privacy
			Principles, please contact us first using the details below and set out your concern. We will
			acknowledge your complaint, investigate it, and aim to respond within 30 days.
		</p>
		<p class="mt-6">
			If you are not satisfied with our response, you can refer your complaint to the Office of the
			Australian Information Commissioner (OAIC):
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-8">
			<li>
				Website: <a
					href="https://www.oaic.gov.au"
					target="_blank"
					rel="noopener noreferrer"
					class="underline underline-offset-2 hover:text-[#FFC640]">www.oaic.gov.au</a
				>
			</li>
			<li>
				Phone: <a href="tel:1300363992" class="underline underline-offset-2 hover:text-[#FFC640]"
					>1300 363 992</a
				>
			</li>
			<li>Post: GPO Box 5218, Sydney NSW 2001</li>
		</ul>

		<h2 id="other-websites" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			12. Links to other websites
		</h2>
		<p class="mt-6">
			Our website may link to other websites — manufacturers, government programs, social media and
			mapping services. We are not responsible for the privacy practices or content of those sites.
			We encourage you to read the privacy policy of any website you visit through a link from ours.
		</p>

		<h2 id="changes" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			13. Changes to this policy
		</h2>
		<p class="mt-6">
			We may update this policy from time to time to reflect changes in our business, technology or
			the law. The current version will always be available on this page, with the date it was last
			updated shown at the top. Any changes take effect once published.
		</p>

		<h2 id="contact-us" class="font-heading mt-16 scroll-mt-32 text-3xl sm:text-4xl">
			14. Contact us
		</h2>
		<p class="mt-6">
			If you have a question about this policy, want to access or correct your information, opt out
			of marketing, or make a privacy complaint, get in touch:
		</p>
	</div>

	<div class="mt-10 rounded-2xl bg-black px-6 py-10 text-white sm:px-10">
		<h3 class="font-heading text-3xl text-[#FFC640]">Maximum Solar</h3>
		<div class="mt-6 space-y-3 text-base text-gray-300">
			<p>
				Email: <a
					href="mailto:info@maximumsolar.com.au"
					class="underline underline-offset-2 hover:text-[#FFC640]">info@maximumsolar.com.au</a
				>
			</p>
			<p>
				Phone: <a href="tel:1300457542" class="underline underline-offset-2 hover:text-[#FFC640]"
					>1300 457 542</a
				>
			</p>
			<p>
				Post: Warehouse 3, Lot 4/21 South Arm Hwy,<br />
				Mornington TAS 7018
			</p>
		</div>
		<a
			href="/contact"
			class="mt-8 inline-block rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC640]"
		>
			Contact us
		</a>
	</div>
</section>
