// Content for the 6 location pages. Copy is lifted verbatim from
// "MAXIMUM SOLAR New pages copy MAY 2026" and rendered through
// LocationPage.svelte. Each FAQ array also feeds FAQPage JSON-LD via SEO.svelte.

export type ContentSection = {
	heading: string;
	paragraphs?: string[];
	bullets?: string[];
};

export type FaqItem = {
	question: string;
	answer: string;
};

export type LocationPage = {
	slug: string;
	areaName: string;
	titleTag: string;
	metaDescription: string;
	h1: string;
	sections: ContentSection[];
	faqItems: FaqItem[];
};

export const locationPages: LocationPage[] = [
	{
		slug: 'solar-launceston',
		areaName: 'Launceston',
		titleTag: 'Solar Panels Launceston | Maximum Solar Tasmania',
		metaDescription:
			'Maximum Solar installs high-quality solar panels across Launceston and northern Tasmania. CEC-accredited, locally owned, 10-year workmanship warranty. Get a free quote today.',
		h1: 'Solar Panel Installation in Launceston',
		sections: [
			{
				heading: "Launceston's Local Solar Experts",
				paragraphs: [
					'Maximum Solar is a 100% Tasmanian-owned solar company with offices in both Hobart and Launceston. Our team installs high-quality solar systems for homes and businesses across Launceston and the northern regions of Tasmania - from Prospect to Newstead, Legana to Ravenswood, and everywhere in between.',
					'With 13 years of industry experience and a team of CEC-accredited installers, we design systems built specifically for Tasmanian conditions. That means panels and equipment rated to handle the cold, the variable cloud cover, and the particular energy consumption patterns of northern Tasmanian households.'
				]
			},
			{
				heading: 'Why Launceston Homeowners Are Going Solar',
				paragraphs: [
					"Energy costs in Tasmania have risen steadily over recent years, and Launceston households are feeling it. The good news is that Launceston receives solid solar irradiance - enough to generate significant savings year-round, even accounting for Tasmania's cooler climate. Paired with a quality battery system, a well-sized solar installation can dramatically reduce or eliminate your grid electricity bill.",
					'Maximum Solar will assess your specific roof orientation, energy usage, and household size to recommend the right system - not an oversized one designed to maximise our margins, but the right one for your situation.'
				]
			},
			{
				heading: "What's Included in Every Launceston Installation",
				bullets: [
					'Free energy assessment and system design',
					'Tier 1 solar panels including Australian-made Tindo Solar',
					'Premium inverters - Sungrow, Fronius, and SMA',
					'Marine-grade rust-proof steel racking',
					'CEC-accredited installation team',
					'10-year workmanship warranty',
					'25-year panel performance warranty',
					'Full system commissioning and handover'
				]
			},
			{
				heading: 'Battery Storage in Launceston',
				paragraphs: [
					'Want to maximise your solar investment? A battery system stores the excess energy your panels generate during the day so you can use it at night - reducing your reliance on the grid further. Maximum Solar is a Tesla Powerwall-certified installer and works with leading battery systems to find the right fit for your home and energy goals.'
				]
			}
		],
		faqItems: [
			{
				question: "Does solar work well in Launceston's climate?",
				answer:
					'Yes. Launceston receives enough annual solar radiation to generate strong returns from a quality solar system. While Tasmania’s climate is cooler than the mainland, solar panels actually perform more efficiently at lower temperatures. The key is correct system sizing and orientation for your specific property.'
			},
			{
				question: 'How much does solar cost in Launceston?',
				answer:
					'A typical 6.6kW residential solar system in Launceston costs between $6,000 and $9,000 after the federal Small-scale Technology Certificate (STC) rebate is applied. The exact cost depends on system size, panel brand, and roof complexity. Contact Maximum Solar for a free personalised quote.'
			},
			{
				question: 'Are there solar rebates available in Tasmania?',
				answer:
					'Yes. Tasmanian homeowners can access federal STCs (Small-scale Technology Certificates), which provide a significant upfront discount on the installed cost of a solar system. The rebate amount depends on system size and your location. Maximum Solar handles all rebate paperwork as part of the installation process.'
			},
			{
				question: 'How long does a solar installation take in Launceston?',
				answer:
					'Most residential solar installations are completed in a single day. The process from enquiry to installation typically takes 2–4 weeks, depending on grid connection approvals from TasNetworks and scheduling availability.'
			},
			{
				question: 'Is Maximum Solar based in Launceston?',
				answer:
					'Yes. Maximum Solar has an office in Launceston and services all of northern Tasmania including the Tamar Valley, Meander Valley, West Tamar, East Tamar, and surrounding regions.'
			},
			{
				question: 'What solar system size do I need for my Launceston home?',
				answer:
					'For a typical Launceston household of 3–4 people, a 6.6kW system is a common starting point. Larger homes or those with high energy usage - particularly those heating with electricity - may benefit from a larger system. Maximum Solar will assess your energy bills and usage patterns to recommend the right size.'
			}
		]
	},
	{
		slug: 'solar-devonport',
		areaName: 'Devonport',
		titleTag: 'Solar Panels Devonport | Maximum Solar Tasmania',
		metaDescription:
			'Maximum Solar provides expert solar panel installation across Devonport and north-west Tasmania. Locally owned, CEC-accredited, with a 10-year workmanship warranty. Get your free quote.',
		h1: 'Solar Panel Installation in Devonport',
		sections: [
			{
				heading: 'Serving Devonport and the North-West Coast',
				paragraphs: [
					"Maximum Solar installs solar panels and battery systems for homes and businesses across Devonport and the broader north-west coast of Tasmania. From Devonport itself to Ulverstone, Penguin, Latrobe, and Port Sorell, our Tasmanian-based team brings the same quality of installation and service we're known for across the state.",
					"As a 100% locally owned company with offices in both Hobart and Launceston, we understand the specific conditions and energy needs of Tasmanian properties. Our CEC-accredited installers design systems built to perform in Tasmania's climate for the long term."
				]
			},
			{
				heading: 'The Case for Solar in Devonport',
				paragraphs: [
					'The north-west coast has excellent solar potential - one of the more consistent sunshine profiles in Tasmania. Devonport homeowners who make the switch to solar typically see meaningful reductions in their electricity bills within the first billing cycle, with full return on investment typically achieved within 4–7 years depending on system size and energy usage.',
					'With electricity prices continuing to rise, the financial case for solar has never been stronger. Maximum Solar will help you model the expected savings for your specific home and provide a transparent, no-obligation quote.'
				]
			},
			{
				heading: 'Our Installation Process',
				bullets: [
					'Free consultation and energy assessment',
					'Custom system design for your roof and energy profile',
					'Tier 1 equipment - Tindo, Sungrow, Fronius, SMA',
					'Fully accredited installation by experienced Tasmanian tradespeople',
					'Grid connection coordination with TasNetworks',
					'10-year workmanship warranty and 25-year panel warranty',
					'Post-installation system check and owner walkthrough'
				]
			}
		],
		faqItems: [
			{
				question: 'Does Maximum Solar service the Devonport area?',
				answer:
					'Yes. Maximum Solar services all of Devonport and the surrounding north-west coast including Ulverstone, Penguin, Latrobe, Port Sorell, and surrounding towns. Contact us to confirm coverage for your specific location.'
			},
			{
				question: 'How much can I save on electricity with solar in Devonport?',
				answer:
					'Savings depend on your system size, energy usage, and how much of your solar generation you consume directly. As a rough guide, a well-sized 6.6kW system in Devonport could reduce a typical household electricity bill by 50–80%. Maximum Solar will model expected savings for your specific situation as part of the free quote process.'
			},
			{
				question: 'What rebates are available for solar in Devonport?',
				answer:
					'Devonport homeowners can access federal Small-scale Technology Certificates (STCs), which reduce the upfront cost of a solar installation significantly. The value of STCs is automatically deducted from your quoted price - Maximum Solar handles all the paperwork.'
			},
			{
				question: 'How long does a solar installation take?',
				answer:
					'Most installations are completed in a single day. From initial quote to installation, the typical timeline is 2–4 weeks, including grid connection approvals.'
			},
			{
				question: 'Can I add a battery to my solar system in Devonport?',
				answer:
					'Yes. Battery storage is an excellent addition for Devonport homeowners who want to use their solar energy at night or protect against power outages. Maximum Solar is a Tesla Powerwall-certified installer and can advise on the best battery solution for your home.'
			}
		]
	},
	{
		slug: 'solar-burnie',
		areaName: 'Burnie',
		titleTag: 'Solar Panels Burnie | Maximum Solar Tasmania',
		metaDescription:
			'Expert solar installation for homes and businesses in Burnie and north-west Tasmania. Maximum Solar - 100% Tasmanian owned, CEC-accredited, 10-year workmanship warranty.',
		h1: 'Solar Panel Installation in Burnie',
		sections: [
			{
				heading: 'Solar for Burnie Homes and Businesses',
				paragraphs: [
					"Maximum Solar provides residential and commercial solar installations across Burnie and the broader north-west of Tasmania. Whether you're in Burnie itself or the surrounding areas of Wynyard, Somerset, or Wivenhoe, our team designs and installs systems built to Tasmanian conditions with tier 1 equipment and a 10-year workmanship warranty.",
					"Burnie's coastal position means it receives solid solar irradiance through much of the year. A properly designed system - sized correctly for your roof and energy needs - will generate meaningful returns from day one."
				]
			},
			{
				heading: 'Commercial Solar in Burnie',
				paragraphs: [
					'Burnie has a strong commercial and industrial base, and businesses in the region are increasingly turning to solar as a way to manage energy costs. Maximum Solar designs and installs commercial-scale systems for a range of property types - from retail premises to industrial warehouses. Commercial solar often delivers faster payback than residential, particularly for businesses with high daytime energy usage.'
				]
			}
		],
		faqItems: [
			{
				question: 'Does Maximum Solar install solar in Burnie?',
				answer:
					'Yes. Maximum Solar services Burnie and the surrounding north-west coastal region including Wynyard, Somerset, Wivenhoe, and surrounding areas.'
			},
			{
				question: 'Is solar worth it in Burnie?',
				answer:
					"Yes. Despite Tasmania's reputation for variable weather, Burnie receives sufficient solar radiation to make a quality solar installation financially worthwhile. Correct system sizing and panel orientation are key, and Maximum Solar's free energy assessment will model your expected returns before you commit."
			},
			{
				question: 'Do you install commercial solar in Burnie?',
				answer:
					'Yes. Maximum Solar installs commercial solar systems for businesses of all sizes in Burnie and the north-west coast. Commercial properties with high daytime energy consumption typically achieve the fastest payback periods.'
			},
			{
				question: 'What brands of solar panels does Maximum Solar use?',
				answer:
					'Maximum Solar uses exclusively tier 1 solar panels including Australian-made Tindo Solar, and premium inverter brands Sungrow, Fronius, and SMA. We do not use cheap imported panels that lack quality, longevity, or local warranty support.'
			}
		]
	},
	{
		slug: 'solar-huon-valley',
		areaName: 'Huon Valley',
		titleTag: 'Solar Panels Huon Valley | Maximum Solar Tasmania',
		metaDescription:
			'Solar installation for Huon Valley homes and rural properties. Maximum Solar - Tasmanian owned, CEC-accredited, experienced in rural and off-grid systems. Free quote available.',
		h1: 'Solar Panel Installation in the Huon Valley',
		sections: [
			{
				heading: 'Solar for Huon Valley Homes and Rural Properties',
				paragraphs: [
					"The Huon Valley is one of Tasmania's most beautiful and productive regions - and a great one for solar. Maximum Solar installs residential and rural solar systems across the valley, from Huonville and Franklin to Geeveston, Dover, and the channel area.",
					'Many Huon Valley properties have larger roof areas, higher energy consumption, and in some cases limited or unreliable grid access - all factors that make solar and battery storage an especially smart investment. Our team has experience with rural properties, farm energy requirements, and off-grid system design.'
				]
			},
			{
				heading: 'Rural and Farm Solar in the Huon Valley',
				paragraphs: [
					'Agricultural and horticultural properties in the Huon Valley have specific energy needs - irrigation, cool storage, processing equipment - often running during peak daylight hours, which makes solar particularly well-suited. Maximum Solar designs systems that match your production and usage patterns, whether you need a grid-connected system to offset bills or a more self-sufficient off-grid setup.'
				]
			}
		],
		faqItems: [
			{
				question: 'Does Maximum Solar service the Huon Valley?',
				answer:
					'Yes. Maximum Solar installs solar systems across the Huon Valley including Huonville, Franklin, Geeveston, Dover, Cygnet, and the channel communities south of Hobart.'
			},
			{
				question: 'Can I go off-grid in the Huon Valley?',
				answer:
					'Off-grid is achievable for many Huon Valley properties, particularly those with larger energy needs and good roof or ground-mount potential. It requires careful system design and appropriately sized battery storage. Maximum Solar can assess whether off-grid is viable and cost-effective for your situation.'
			},
			{
				question: 'Do you install solar for farms and rural properties?',
				answer:
					'Yes. Maximum Solar has experience designing and installing solar systems for agricultural properties including farms, orchards, and processing facilities. Rural systems often have specific requirements around system sizing, inverter configuration, and mounting - our team will design accordingly.'
			},
			{
				question: 'What is the payback period for solar in the Huon Valley?',
				answer:
					'For a typical residential installation, payback periods of 4–7 years are common. Rural and agricultural systems with high daytime energy use can achieve even faster returns. Maximum Solar will model your specific payback timeline as part of the free quote process.'
			}
		]
	},
	{
		slug: 'solar-sorell-midlands',
		areaName: 'Sorell & the Midlands',
		titleTag: 'Solar Panels Sorell & Midlands Tasmania | Maximum Solar',
		metaDescription:
			'Solar installation for homes and properties in Sorell, Richmond, and the Tasmanian Midlands. Maximum Solar - locally owned, CEC-accredited, experienced in rural systems.',
		h1: 'Solar Panel Installation in Sorell and the Midlands',
		sections: [
			{
				heading: 'Solar Across Sorell, Richmond, and the Midlands',
				paragraphs: [
					'Maximum Solar services the Sorell municipality, Richmond, and properties across the Tasmanian Midlands. This region - which spans from the Coal River Valley through to Campbell Town and beyond - has excellent solar potential, with the Midlands in particular enjoying some of Tasmania’s highest sunshine hours.',
					"Whether you're in a rural property in the Midlands or a residential home in Sorell or Richmond, Maximum Solar will design a system suited to your property, energy needs, and budget."
				]
			}
		],
		faqItems: [
			{
				question: 'Does Maximum Solar service Sorell and the Midlands?',
				answer:
					'Yes. Maximum Solar installs solar systems in Sorell, Richmond, Oatlands, Campbell Town, and properties throughout the Tasmanian Midlands.'
			},
			{
				question: 'Is solar a good investment in the Midlands?',
				answer:
					"The Tasmanian Midlands receives some of the state's highest sunshine hours, making it one of the better locations in Tasmania for solar generation. Maximum Solar will model expected output and savings for your specific property as part of the free quote process."
			},
			{
				question: 'Can Maximum Solar install on rural Midlands properties?',
				answer:
					"Yes. Our team has experience with a range of property types including large rural blocks, farm buildings, and properties with unique roof or mounting requirements. Ground-mounted systems are also available where roof installation isn't ideal."
			}
		]
	},
	{
		slug: 'solar-kingborough',
		areaName: 'Kingborough',
		titleTag: 'Solar Panels Kingborough | Maximum Solar Tasmania',
		metaDescription:
			'Solar panel installation for homes in Kingborough - Kingston, Blackmans Bay, Huonville and surrounds. Maximum Solar, locally owned, CEC-accredited. Get a free quote.',
		h1: 'Solar Panel Installation in Kingborough',
		sections: [
			{
				heading: 'Solar for Kingborough Homes',
				paragraphs: [
					'Kingborough is one of Hobart’s fastest-growing regions and a strong market for residential solar. Maximum Solar installs systems across Kingston, Blackmans Bay, Margate, Snug, Kettering, and the broader Kingborough area.',
					"With many newer homes and a high proportion of family households with above-average energy consumption, Kingborough properties are well-suited to solar. Maximum Solar's team will assess your roof, energy usage, and goals to design the right system for your home."
				]
			},
			{
				heading: 'Why Kingborough Households Are Switching to Solar',
				paragraphs: [
					'Electricity costs have climbed steadily and Kingborough households - with pools, EVs, and home offices increasingly common - are seeing larger bills than ever. Solar gives you back control. A well-sized system offsets the majority of your daytime consumption, and paired with a battery, can extend those savings through the evening peak period when grid electricity is most expensive.'
				]
			}
		],
		faqItems: [
			{
				question: 'Does Maximum Solar install in Kingborough?',
				answer:
					'Yes. Maximum Solar services all of Kingborough including Kingston, Blackmans Bay, Margate, Snug, Kettering, Woodbridge, and surrounding areas.'
			},
			{
				question: 'What size solar system do I need for a Kingborough home?',
				answer:
					'For a typical Kingborough family home, a 6.6kW to 10kW system is a common range depending on roof size and energy usage. Homes with pools, EVs, or electric heating may benefit from a larger system. Maximum Solar will assess your energy bills and recommend the right size.'
			},
			{
				question: 'Is it worth adding a battery in Kingborough?',
				answer:
					'For households that want to maximise savings or protect against outages, yes. A battery allows you to store excess solar generation and use it during the evening when electricity rates are highest. Maximum Solar will advise on whether the numbers stack up for your specific home.'
			},
			{
				question: 'How long has Maximum Solar been operating in the Hobart area?',
				answer:
					'Maximum Solar has been operating in Tasmania for over 13 years, with a Hobart office serving greater Hobart, Kingborough, and southern Tasmania. The company is co-founded and run by long-time Tasmanians Patrick Bass and Antonio Macri.'
			}
		]
	}
];

export function getLocationPage(slug: string): LocationPage | undefined {
	return locationPages.find((page) => page.slug === slug);
}
