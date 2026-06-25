// Content for the 6 service pages. Copy is lifted verbatim from
// "MAXIMUM SOLAR New pages copy MAY 2026" and rendered through
// ServicePage.svelte. Each FAQ array also feeds FAQPage JSON-LD via SEO.svelte.

import type { ContentSection, FaqItem } from '$lib/data/locationPages';

export type ServicePage = {
	slug: string;
	shortName: string;
	titleTag: string;
	metaDescription: string;
	h1: string;
	sections: ContentSection[];
	faqItems: FaqItem[];
};

export const servicePages: ServicePage[] = [
	{
		slug: 'battery-storage',
		shortName: 'Battery Storage',
		titleTag: 'Battery Storage Systems Tasmania | Maximum Solar',
		metaDescription:
			'Battery storage solutions for Tasmanian homes and businesses. Maximum Solar is a Tesla Powerwall-certified installer offering leading battery systems to maximise your solar investment.',
		h1: 'Solar Battery Storage Systems for Tasmanian Homes',
		sections: [
			{
				heading: 'Store Your Solar, Use It When You Need It',
				paragraphs: [
					'A solar battery system stores the excess energy your solar panels generate during the day - energy that would otherwise be fed back to the grid at a low feed-in tariff - and makes it available when you need it: evenings, early mornings, or during a power outage.',
					"For Tasmanian households, battery storage makes particular sense. With cool winters meaning higher evening heating loads and shorter day lengths reducing solar generation hours, a battery extends the window during which you're drawing from your own stored energy rather than the grid."
				]
			},
			{
				heading: 'Tesla Powerwall - Certified Installer',
				paragraphs: [
					"Maximum Solar is a certified Tesla Powerwall installer. The Powerwall is one of the world's most proven home battery systems - reliable, well-warranted, and backed by Tesla's global support network. It integrates seamlessly with both new and existing solar systems and includes a built-in backup gateway for whole-home outage protection.",
					'We also work with other leading battery systems and will recommend the right solution based on your energy goals, budget, and existing setup.'
				]
			},
			{
				heading: 'Is Battery Storage Right for You?',
				bullets: [
					'You use significant electricity in the evenings or early mornings',
					'You want protection against power outages',
					'You live in a fire-prone area or have life-support equipment at home',
					'You have an EV and want to charge it from stored solar',
					'You want to maximise self-consumption and minimise grid reliance'
				]
			},
			{
				heading: 'Battery Storage for Commercial Properties',
				paragraphs: [
					'Commercial battery systems can provide demand charge management, backup power, and further energy bill reductions on top of solar savings. Maximum Solar designs commercial battery solutions for businesses across Tasmania.'
				]
			}
		],
		faqItems: [
			{
				question: 'How much does a solar battery cost in Tasmania?',
				answer:
					"Home battery systems in Tasmania typically range from $8,000 to $15,000 installed depending on capacity and brand. A Tesla Powerwall 3 starts at around $12,000–$14,000 installed. The right battery size depends on your household's evening energy consumption. Maximum Solar will provide a detailed quote including expected payback period."
			},
			{
				question: 'What is the best battery system for a Tasmanian home?',
				answer:
					'The right battery depends on your energy usage, budget, and goals. Tesla Powerwall is a market-leading option with strong warranties and proven performance. Maximum Solar works with multiple battery brands and will recommend the best fit for your situation - not just the one with the best margin.'
			},
			{
				question: 'Can I add a battery to my existing solar system?',
				answer:
					'In most cases, yes. Whether your existing inverter is battery-ready or requires an additional hybrid inverter depends on the system. Maximum Solar can assess your existing setup and advise on the most cost-effective way to add battery storage.'
			},
			{
				question: 'Does a battery provide backup power during an outage?',
				answer:
					"Yes, if your system is configured for backup. Not all battery installations include backup functionality by default - it depends on the system and how it's wired. Tesla Powerwall includes a backup gateway as standard. Maximum Solar will confirm what backup capability is included in any system we quote."
			},
			{
				question: 'How long does a solar battery last?',
				answer:
					'Most quality home batteries are warranted for 10 years or a specified number of cycles, with an end-of-warranty capacity guarantee (typically around 70–80% of original capacity). Real-world lifespans are often longer. Maximum Solar only installs batteries from manufacturers with strong warranty and local support.'
			},
			{
				question: 'Will a battery make my solar system fully off-grid?',
				answer:
					"A standard home battery like the Powerwall is designed for grid-connected use - it reduces your grid reliance significantly but doesn't take you fully off-grid. True off-grid systems require larger battery banks and careful system design. Maximum Solar can advise on off-grid options if that's your goal."
			}
		]
	},
	{
		slug: 'solar-maintenance',
		shortName: 'Solar Maintenance',
		titleTag: 'Solar Panel Maintenance Tasmania | Maximum Solar',
		metaDescription:
			"Professional solar panel maintenance and servicing across Tasmania. Inspections, cleaning, fault diagnosis, and performance checks from Maximum Solar's CEC-accredited team.",
		h1: 'Solar Panel Maintenance and Servicing in Tasmania',
		sections: [
			{
				heading: 'Keep Your System Performing at Its Best',
				paragraphs: [
					"Solar panels are designed to be low-maintenance - but they're not no-maintenance. Over time, dirt, lichen, bird droppings, and general weathering reduce panel output. Connections can degrade. Inverters can develop faults. A system that's not regularly checked may be generating significantly less than it should - and you may not know until it shows up in your electricity bills.",
					'Maximum Solar offers professional maintenance and servicing for all solar systems across Tasmania, regardless of who installed them.'
				]
			},
			{
				heading: 'What Our Maintenance Service Includes',
				bullets: [
					'Full visual inspection of all panels, mounting hardware, and DC cabling',
					'Inverter performance check and error log review',
					'Panel cleaning - removal of dirt, lichen, and debris',
					'String testing and electrical safety check',
					'Roof penetration and weatherproofing inspection',
					'Performance comparison against expected output',
					'Written report with findings and recommendations'
				]
			},
			{
				heading: 'When to Get Your Solar System Serviced',
				paragraphs: [
					"We recommend a professional inspection every 2–3 years for most systems, or sooner if you notice a drop in generation, an inverter error, or physical damage to panels or hardware. Tasmania's climate - including heavy rain, hail events, and lichen growth - means Tasmanian systems benefit from more regular attention than those in drier climates."
				]
			}
		],
		faqItems: [
			{
				question: 'How often should I get my solar panels serviced in Tasmania?',
				answer:
					"We recommend a professional inspection every 2–3 years for most residential systems. Tasmania's climate - with higher rainfall, lichen growth, and hail risk - means more regular checks are worthwhile compared to drier mainland locations. If you notice reduced generation or inverter errors, get it checked sooner."
			},
			{
				question: "Will Maximum Solar service a system they didn't install?",
				answer:
					"Yes. Maximum Solar services solar systems across Tasmania regardless of who originally installed them. Bring us your system specs or previous installation documentation if you have it, and we'll take it from there."
			},
			{
				question: 'How do I know if my solar panels need cleaning?',
				answer:
					"The clearest sign is a drop in your system's output compared to similar conditions in previous months or years. You can also visually inspect panels from the ground - a visible layer of dirt, dust, lichen patches, or bird droppings is a reliable indicator. Tasmania's wet winters can actually keep panels reasonably clean, but lichen is a common issue on older systems."
			},
			{
				question: 'What does a solar maintenance visit cost?',
				answer:
					"Costs vary depending on system size, roof access, and the extent of work required. Contact Maximum Solar for a quote - we'll give you a clear price before the visit."
			},
			{
				question: 'Can dirty solar panels void my warranty?',
				answer:
					'Some panel warranties include maintenance requirements, and failure to keep panels clean could be used to dispute a warranty claim in extreme cases. More practically, dirty panels simply generate less power - regular cleaning is a straightforward way to protect your investment.'
			}
		]
	},
	{
		slug: 'farm-solar-tasmania',
		shortName: 'Farm & Rural Solar',
		titleTag: 'Farm and Rural Solar Tasmania | Maximum Solar',
		metaDescription:
			'Solar systems designed for Tasmanian farms, agricultural properties, and rural businesses. Maximum Solar has experience with large-scale rural installations, off-grid systems, and farm energy management.',
		h1: 'Farm and Rural Solar Systems in Tasmania',
		sections: [
			{
				heading: 'Solar Built for Tasmanian Agriculture',
				paragraphs: [
					'Farms and rural properties have specific energy requirements that differ significantly from residential solar. Higher consumption, three-phase power, large roof or ground areas, irrigation loads, cool storage, and in some cases limited grid access - all of these call for a system designed by people who understand agricultural energy use.',
					'Maximum Solar has experience designing and installing solar for farming operations across Tasmania. We work with you to understand your production cycles, peak energy demands, and infrastructure to deliver a system that works as hard as you do.'
				]
			},
			{
				heading: 'Farm Solar Applications',
				bullets: [
					'Irrigation pump solar - reduce the running cost of electric pumps',
					'Cool room and refrigeration offset - high daytime loads align well with solar generation',
					'Shed and workshop power - large roof areas often ideal for solar',
					'Whole-property solar with battery backup for outage protection',
					'Off-grid or hybrid systems for remote properties',
					'Three-phase installations for larger agricultural equipment'
				]
			},
			{
				heading: 'Off-Grid and Hybrid Systems for Remote Properties',
				paragraphs: [
					'Many Tasmanian farming properties are in locations where grid connection is expensive, unreliable, or simply unavailable. Maximum Solar designs off-grid and hybrid solar-battery systems that can power a property entirely from renewable energy - eliminating generator running costs and providing energy independence.',
					"Off-grid design requires careful assessment of your energy loads, seasonal variation, and backup requirements. We'll model your system to ensure it performs reliably through Tasmania's shorter winter days."
				]
			}
		],
		faqItems: [
			{
				question: 'Can Maximum Solar design a solar system for my Tasmanian farm?',
				answer:
					'Yes. Maximum Solar has experience with agricultural solar installations across Tasmania, including dairy farms, orchards, vegetable growing operations, and mixed farming properties. We design systems around your specific energy loads and infrastructure.'
			},
			{
				question: 'What is the payback period for farm solar?',
				answer:
					'Agricultural properties with high daytime energy consumption - particularly irrigation or refrigeration loads - can achieve payback periods as short as 3–5 years. The exact figure depends on system size, energy usage patterns, and existing tariff. Maximum Solar will model your specific payback as part of the design process.'
			},
			{
				question: 'Can solar power irrigation pumps on a Tasmanian farm?',
				answer:
					'Yes. Electric irrigation pumps are one of the best uses of farm solar - they typically run during daylight hours when generation is high, and the energy savings can be substantial. Maximum Solar will size the system to match your pump load and operating schedule.'
			},
			{
				question: 'Do you install three-phase solar systems for farms?',
				answer:
					'Yes. Maximum Solar installs three-phase solar and battery systems for agricultural and commercial properties that require it. Three-phase systems are more complex than single-phase residential installations and require specific inverter configurations - our team has the experience to design and install them correctly.'
			},
			{
				question: 'Can I get off-grid solar for a remote Tasmanian property?',
				answer:
					"Yes. Maximum Solar designs off-grid solar-battery systems for remote properties where grid connection is impractical or unavailable. Off-grid requires careful load analysis and system sizing to ensure reliability through Tasmania's shorter winter days. Contact us to discuss your property and energy needs."
			}
		]
	},
	{
		slug: 'solar-rebates-tasmania',
		shortName: 'Solar Rebates & Incentives',
		titleTag: 'Solar Rebates and Incentives Tasmania 2025 | Maximum Solar',
		metaDescription:
			'A complete guide to solar rebates and incentives available to Tasmanian homeowners and businesses in 2025. STCs, feed-in tariffs, and more - explained clearly by Maximum Solar.',
		h1: 'Solar Rebates and Incentives Available in Tasmania',
		sections: [
			{
				heading: 'What Solar Incentives Are Available in Tasmania?',
				paragraphs: [
					"Installing solar in Tasmania comes with access to several financial incentives that can significantly reduce the upfront cost and improve the return on your investment. Here's a clear breakdown of what's available in 2025."
				]
			},
			{
				heading: 'Small-scale Technology Certificates (STCs)',
				paragraphs: [
					"STCs are the main federal rebate for solar in Australia. When you install a solar system, you're entitled to a number of certificates based on your system's size, location, and the number of years remaining until 2030 (when the scheme ends). These certificates are traded on the open market and are typically assigned to your installer in exchange for an upfront discount on your system price.",
					"For a typical 6.6kW system in Tasmania in 2025, the STC rebate is worth approximately $2,500–$3,500. Maximum Solar handles all STC paperwork and the discount is applied directly to your quoted price - you don't need to do anything."
				]
			},
			{
				heading: 'Feed-In Tariffs in Tasmania',
				paragraphs: [
					"When your solar system generates more electricity than you're using, the excess is exported to the grid and you receive a feed-in tariff (FiT). In Tasmania, the feed-in tariff is set by the Tasmanian Economic Regulator and reviewed periodically. Currently, Aurora Energy and other retailers offer FiTs that partially offset your grid consumption during times when your panels aren't generating.",
					'While feed-in tariffs have reduced in recent years, maximising self-consumption - particularly with a battery - remains the best way to extract value from your solar system.'
				]
			},
			{
				heading: 'Business Incentives',
				paragraphs: [
					'Businesses installing solar may be eligible for additional tax incentives including the instant asset write-off (for eligible small businesses) and standard depreciation provisions. These can significantly improve the financial case for commercial solar. Maximum Solar recommends speaking with your accountant about the specific tax treatment applicable to your business.'
				]
			}
		],
		faqItems: [
			{
				question: 'How much is the solar rebate in Tasmania in 2025?',
				answer:
					'The federal STC rebate for a 6.6kW solar system in Tasmania in 2025 is approximately $2,500–$3,500, depending on the exact system size and current STC spot price. The rebate reduces each year as the scheme steps down toward its 2030 end date - so there is a genuine benefit to installing sooner rather than later.'
			},
			{
				question: 'Do I need to apply for the solar rebate myself?',
				answer:
					'No. Maximum Solar handles all STC paperwork on your behalf. The rebate value is deducted from your quoted system price upfront - you simply pay the net amount.'
			},
			{
				question: 'Is there a Tasmanian state solar rebate?',
				answer:
					'As of 2025, there is no dedicated state government solar rebate in Tasmania separate from the federal STC scheme. Maximum Solar keeps up to date with any new state programs and will advise you of any additional incentives available at the time of your quote.'
			},
			{
				question: 'What is the feed-in tariff rate in Tasmania?',
				answer:
					'Feed-in tariff rates in Tasmania vary by retailer and are reviewed periodically. Contact your retailer or Maximum Solar for the current applicable rate - we can advise on how to structure your system to maximise the value you receive from exported energy.'
			},
			{
				question: 'Are STCs going away?',
				answer:
					'The STC scheme is scheduled to step down annually until it ends in 2030. Each year the rebate is slightly lower. This is a genuine reason to install sooner rather than later - the rebate available in 2025 is higher than it will be in 2026 and beyond.'
			}
		]
	},
	{
		slug: 'off-grid-solar-tasmania',
		shortName: 'Off-Grid Solar',
		titleTag: 'Off-Grid Solar Systems Tasmania | Maximum Solar',
		metaDescription:
			"Off-grid solar design and installation for remote Tasmanian properties. Maximum Solar designs reliable off-grid systems built for Tasmania's climate and seasonal variation.",
		h1: 'Off-Grid Solar Systems in Tasmania',
		sections: [
			{
				heading: 'Energy Independence for Remote Tasmanian Properties',
				paragraphs: [
					'Going off-grid means generating and storing all of your own electricity, independent of the Tasmanian network. For properties in remote locations where grid connection is expensive or unavailable, off-grid solar is often the most practical and cost-effective long-term solution.',
					"Maximum Solar designs off-grid systems specifically for Tasmanian conditions - accounting for the state's shorter winter days, variable cloud cover, and the higher energy loads that come with heating in a cool climate."
				]
			},
			{
				heading: 'Off-Grid vs Hybrid Systems',
				paragraphs: [
					'A true off-grid system has no grid connection at all - your solar array and battery bank supply all of your electricity needs. A hybrid system maintains a grid connection as a backup while still allowing you to operate primarily from solar and battery storage.',
					'For most Tasmanian properties considering energy independence, a hybrid approach offers the best balance of self-sufficiency and security, particularly through winter when solar generation is lower.'
				]
			},
			{
				heading: 'What Off-Grid Design Involves',
				bullets: [
					'Detailed energy load assessment - everything you run, when you run it',
					'System sizing to handle worst-case winter generation scenarios',
					'Battery bank sizing for multi-day autonomy',
					'Backup generation integration where required',
					'Inverter and charge controller selection for the specific load profile',
					'Installation, commissioning, and full owner training'
				]
			}
		],
		faqItems: [
			{
				question: 'Can I go completely off-grid in Tasmania?',
				answer:
					'Yes, off-grid living is achievable in Tasmania, but it requires careful system design - particularly to handle the shorter winter days and higher heating loads typical of Tasmanian properties. Maximum Solar will model your annual energy profile to design a system that performs reliably year-round.'
			},
			{
				question: 'What is the difference between off-grid and hybrid solar?',
				answer:
					'An off-grid system has no grid connection and relies entirely on solar generation and battery storage (plus backup generation if included). A hybrid system maintains a grid connection as a safety net while maximising solar self-consumption. Hybrid is often the more practical choice for residential properties, while off-grid suits truly remote locations.'
			},
			{
				question: 'How much does an off-grid solar system cost in Tasmania?',
				answer:
					'Off-grid systems are significantly more expensive than standard grid-connected solar because they require larger battery banks and more robust system design. A residential off-grid system typically starts from around $30,000–$50,000 depending on your energy requirements. Contact Maximum Solar for a site-specific assessment and quote.'
			},
			{
				question: 'Do I need a generator with an off-grid solar system in Tasmania?',
				answer:
					'For most Tasmanian properties, some backup generation capacity is recommended for extended periods of low solar generation in winter. This is typically a small generator that tops up the battery bank during prolonged overcast stretches. Maximum Solar will advise on the appropriate backup solution for your location and energy profile.'
			}
		]
	},
	{
		slug: 'ev-charging-solar',
		shortName: 'EV Charging',
		titleTag: 'Solar EV Charging Tasmania | Maximum Solar',
		metaDescription:
			"Charge your electric vehicle from solar energy with Maximum Solar's EV charging integration. VIARIS charger installation across Tasmania. Save on charging costs and reduce emissions.",
		h1: 'EV Charging Integrated with Solar in Tasmania',
		sections: [
			{
				heading: 'Charge Your EV from the Sun',
				paragraphs: [
					'Electric vehicles and solar panels are a natural partnership. Your panels generate free electricity during the day - your EV can charge from that electricity rather than drawing from the grid. Done well, the cost of charging your EV drops to near zero.',
					'Maximum Solar installs VIARIS EV chargers - a European-designed and manufactured charging solution distributed in partnership with Charge Stations Australia. VIARIS chargers include a function to allow charging solely from solar generation, so your car is powered by your panels, not the grid.'
				]
			},
			{
				heading: 'Why VIARIS?',
				bullets: [
					'European-designed and manufactured by ORBIS, in business since the 1920s',
					'Solar-only charging function - charges exclusively from your solar generation',
					'Works with any EV brand - not locked to one manufacturer',
					'Full monitoring capabilities via app',
					'Super-fast charging - 40% to 100% in 3–9 hours',
					'3-year warranty with local spare parts and customer service in Australia',
					'Installed by licensed electricians only'
				]
			},
			{
				heading: 'Adding EV Charging to a New or Existing Solar System',
				paragraphs: [
					'Maximum Solar can integrate EV charging into a new solar installation or retrofit a VIARIS charger into your existing system. For the best results - particularly if you want to use solar-only charging - a hybrid inverter setup or battery storage gives you more flexibility around when and how you charge.',
					"We'll design the whole system - solar, battery, and EV charger - to work together effectively."
				]
			}
		],
		faqItems: [
			{
				question: 'Can I charge my electric vehicle using solar panels?',
				answer:
					"Yes. A solar system sized to account for EV charging can supply a significant portion or all of your vehicle's charging needs from solar generation. The VIARIS charger installed by Maximum Solar includes a solar-only charging mode that ensures your car charges from your panels rather than the grid."
			},
			{
				question: 'What EV charger does Maximum Solar install?',
				answer:
					'Maximum Solar installs VIARIS EV chargers in partnership with Charge Stations Australia. VIARIS is a European-designed and manufactured charger by ORBIS, a company with over 100 years of electrical manufacturing history. It works with any EV brand and includes solar integration capabilities.'
			},
			{
				question: 'How much does it cost to install an EV charger in Tasmania?',
				answer:
					"EV charger installation costs vary depending on the charger model and the electrical work required. Contact Maximum Solar for a quote that includes both the charger and installation costs. We'll also advise on any modifications needed to your solar or electrical system to accommodate charging."
			},
			{
				question: 'How long does it take to charge an EV with a VIARIS charger?',
				answer:
					"The VIARIS charger can take a typical EV from 40% to 100% charge in 3–9 hours, depending on the vehicle's battery size and the charger's power output. This is well within the timeframe of a typical overnight or daytime solar-powered charge cycle."
			},
			{
				question: 'Do I need a battery to charge my EV from solar?',
				answer:
					"Not necessarily. If you're home during the day and can charge while the sun is shining, solar-only charging without a battery is practical. A battery adds flexibility - allowing you to store solar energy and charge your vehicle in the evening. Maximum Solar can advise on the best setup for your usage patterns."
			}
		]
	}
];

export function getServicePage(slug: string): ServicePage | undefined {
	return servicePages.find((page) => page.slug === slug);
}
