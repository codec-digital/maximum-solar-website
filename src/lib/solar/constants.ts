// ============================================================
// AURORA ENERGY TARIFF DATA — Review annually (effective July)
// Last updated: July 2025
// Source: https://www.auroraenergy.com.au/residential/products/tariffs
// ============================================================

export const TARIFFS = {
	flatRate: {
		label: 'Flat Rate (Tariff 31/41)',
		dailySupplyCharge: 1.541,
		usageRate: 0.2557,
		offPeakRate: null
	},
	timeOfUse: {
		label: 'Time of Use (Tariff 93)',
		dailySupplyCharge: 1.5118,
		peakRate: 0.3548,
		offPeakRate: 0.1669,
		blendedRate: 0.2535 // ~60% off-peak, ~40% peak
	},
	heatingHotWater: {
		label: 'Heating/Hot Water (Tariff 41)',
		dailySupplyCharge: 0.213,
		usageRate: 0.1983,
		offPeakRate: null
	}
} as const;

// When solar is installed in Tasmania, households move onto Tariff 93.
export const DEFAULT_RETAIL_RATE = TARIFFS.timeOfUse.blendedRate; // 0.2535

// ============================================================
// ANNUAL SUPPLY CHARGE — Fixed network access fee.
// This charge CANNOT be offset by solar under any circumstances.
// It must be applied as a minimum floor on all post-solar bill calculations.
// Tariff 93 daily supply charge × 365 days.
// ============================================================
export const ANNUAL_SUPPLY_CHARGE = TARIFFS.timeOfUse.dailySupplyCharge * 365; // ~$551.81/year

// ============================================================
// FEED-IN TARIFF — Review annually (set by Tasmanian Economic Regulator)
// 2024-25: 8.935 c/kWh
// 2025-26: 8.782 c/kWh (current)
// Trend: DECLINING year-on-year as solar penetration increases.
// The FiT component of savings is held FLAT in 25-year projections —
// it is NOT inflated at 3% because the empirical trend is downward.
// ============================================================
export const FEED_IN_TARIFF = 0.08782; // $ per kWh

// ============================================================
// BILL INFLATION RATE
// Applied ONLY to the grid offset (avoided cost) component of savings.
// NOT applied to the FiT export component. See calculator.ts Step 9.
// Source: AEMC data; consistent with SolarCalculator.com.au industry standard.
// ============================================================
export const ANNUAL_BILL_INFLATION_RATE = 0.03; // 3% per year — offset savings only

// ============================================================
// PANEL DEGRADATION RATE
// Solar panels degrade at approximately 0.5% per year (industry standard
// warranty figure for tier-1 panels). Applied in the 25-year projection loop.
// Without this, the 25-year savings figure is overstated by ~6–8%.
// ============================================================
export const PANEL_DEGRADATION_RATE = 0.005; // 0.5% per year

// ============================================================
// SOLAR YIELD CONSTANTS — Region-specific, Tasmania
// Source: BOM solar exposure data + Australian PV Institute.
// Values are CONSERVATIVE — north-facing, unshaded, optimal tilt baseline.
// Orientation multipliers are applied on top (see ORIENTATION_MULTIPLIERS).
// Note: Hobart is lower than Launceston/Burnie due to higher latitude.
// ============================================================
export const KWH_PER_KW_PER_YEAR: Record<string, number> = {
	hobart: 1150, // Conservative for Hobart's latitude and climate
	launceston: 1220, // Marginally better irradiance than Hobart
	burnie: 1180 // Between Hobart and Launceston
};
export const DEFAULT_KWH_PER_KW_PER_YEAR = 1150; // Fallback — uses conservative Hobart value

// ============================================================
// ROOF ORIENTATION MULTIPLIERS
// Applied to annualYieldKwh to adjust for non-optimal roof orientation.
// North-facing at optimal tilt = 1.00 (baseline).
// 'not_sure' uses a conservative assumption reflecting typical suburban mix.
// Source: Clean Energy Council installer guidelines; APVI orientation data.
// ============================================================
export const ORIENTATION_MULTIPLIERS: Record<string, number> = {
	north: 1.0,
	north_east_west: 0.9,
	east_west: 0.82,
	south: 0.65,
	not_sure: 0.88 // Conservative assumption for unknown orientation
};

// ============================================================
// SEASONAL MONTHLY YIELD MULTIPLIERS — Tasmania-specific
// Each value is a multiplier applied to the average monthly yield
// (annualYieldKwh / 12) to reflect Tasmania's pronounced seasonal swing.
// Index 0 = January, 11 = December.
// Summer output is roughly 2.5× winter output in Hobart.
// Source: Derived from BOM solar exposure data for Tasmania.
// ============================================================
export const SEASONAL_MULTIPLIERS: Record<string, number[]> = {
	hobart: [1.45, 1.35, 1.15, 0.9, 0.7, 0.58, 0.62, 0.75, 0.95, 1.15, 1.3, 1.4],
	launceston: [1.45, 1.35, 1.15, 0.92, 0.72, 0.6, 0.64, 0.77, 0.97, 1.17, 1.32, 1.42],
	burnie: [1.42, 1.32, 1.12, 0.88, 0.68, 0.56, 0.6, 0.73, 0.93, 1.13, 1.28, 1.38]
};

// ============================================================
// REGIONAL DATA — Sun hours and postcode mapping
// ============================================================
export const REGIONS: Record<string, { label: string; peakSunHours: number; postcodes: number[] }> =
	{
		hobart: {
			label: 'Hobart',
			peakSunHours: 3.8,
			postcodes: [
				7000, 7001, 7004, 7005, 7007, 7008, 7009, 7010, 7011, 7012, 7015, 7016, 7017, 7018, 7019,
				7020, 7021, 7022, 7023, 7024, 7025, 7026, 7027, 7050, 7051, 7052, 7053, 7054, 7055, 7109,
				7110, 7112, 7116, 7117, 7119, 7120, 7121, 7139, 7140, 7150, 7151, 7152, 7155, 7162, 7163,
				7170, 7171, 7172, 7173, 7174, 7175, 7176, 7177, 7178, 7179, 7180, 7182, 7183, 7184, 7185,
				7186, 7187, 7188, 7189, 7190, 7191, 7192, 7193, 7194, 7195
			]
		},
		launceston: {
			label: 'Launceston & North',
			peakSunHours: 3.9,
			postcodes: [
				7248, 7249, 7250, 7251, 7252, 7253, 7254, 7255, 7256, 7257, 7258, 7259, 7260, 7261, 7262,
				7263, 7264, 7265, 7267, 7268, 7269, 7270, 7275, 7276, 7277, 7290, 7291, 7292, 7300, 7301,
				7302, 7303, 7304, 7305, 7306, 7307, 7310, 7315, 7316, 7320, 7321, 7322, 7325, 7330
			]
		},
		burnie: {
			label: 'Burnie & North-West',
			peakSunHours: 3.7,
			postcodes: [
				7320, 7321, 7322, 7325, 7330, 7331, 7470, 7462, 7466, 7467, 7468, 7469, 7460, 7461, 7315,
				7316, 7312, 7313, 7314
			]
		}
	};

export const DEFAULT_REGION = 'hobart';

// ============================================================
// SYSTEM SIZE MAPPING
// Base mapping from normalised quarterly bill to recommended system size.
// Additional nudges (household size, appliances, EV) applied in calculator.ts.
// ============================================================
export const SYSTEM_SIZE_MAP: Array<{
	quarterlyBillMin: number;
	quarterlyBillMax: number;
	label: string;
	baseSystemSizeKw: number;
	recommendedDescription: string;
}> = [
	{
		quarterlyBillMin: 0,
		quarterlyBillMax: 300,
		label: 'Under $300',
		baseSystemSizeKw: 0,
		recommendedDescription: 'not recommended'
	},
	{
		quarterlyBillMin: 300,
		quarterlyBillMax: 500,
		label: '$300 – $500',
		baseSystemSizeKw: 6.6,
		recommendedDescription:
			"A 6.6kW system is ideal for your usage level. Tasmania's most popular residential system."
	},
	{
		quarterlyBillMin: 500,
		quarterlyBillMax: 700,
		label: '$500 – $700',
		baseSystemSizeKw: 6.6,
		recommendedDescription:
			'A 6.6kW system will offset a substantial portion of your bill, with room to grow.'
	},
	{
		quarterlyBillMin: 700,
		quarterlyBillMax: 1000,
		label: '$700 – $1,000',
		baseSystemSizeKw: 10,
		recommendedDescription: "A 10kW system is recommended for your household's energy needs."
	},
	{
		quarterlyBillMin: 1000,
		quarterlyBillMax: Infinity,
		label: 'Over $1,000',
		baseSystemSizeKw: 13.2,
		recommendedDescription: 'A 13.2kW system is recommended. Designed for high-consumption homes.'
	}
];

export const AVAILABLE_SYSTEM_SIZES = [6.6, 10, 13.2] as const;

// ============================================================
// SELF-CONSUMPTION BASE RATIOS
// These are CONSERVATIVE real-world averages for unoptimised households.
// 'all_day' is set to 0.45, NOT 0.60 — the higher figure requires active
// load-shifting behaviour that most households do not practise initially.
// Australian industry research places typical unoptimised SC at 20–35%;
// 0.45 reflects a well-occupied home without deliberate scheduling.
// ============================================================
export const SELF_CONSUMPTION_BASE: Record<string, number> = {
	all_day: 0.45, // Occupied all day, no active load management
	morning_evening: 0.3, // Away during peak solar hours (9am–3pm)
	night_only: 0.15 // Rarely home during daylight hours
};

// ============================================================
// SELF-CONSUMPTION MODIFIERS
// Applied additively to base ratio. Capped at SC_RATIO_CAP.
// NOTE: EV ownership does NOT modify the SC ratio. EVs are typically
// charged overnight, not during solar generation hours. EV ownership
// affects SYSTEM SIZE (nudge up one tier) but not self-consumption.
// ============================================================
export const SC_MODIFIERS = {
	homeSize: {
		apartment: -0.05,
		medium: 0.0,
		large: +0.05,
		rural: +0.08
	},
	appliances: {
		electricHotWater: +0.05, // Can be timer-shifted to solar hours
		ducatedHvac: +0.08, // High daytime draw in shoulder seasons
		pool: +0.05 // Pump typically runs during daylight
		// evOwned is intentionally ABSENT — see note above
	}
} as const;

export const SC_RATIO_CAP = 0.85;
export const SC_RATIO_FLOOR = 0.1;

// ============================================================
// SYSTEM COST ESTIMATES
// Displayed as a RANGE on the results page, not a single figure.
// Solar installation costs vary ±20% based on roof complexity, panel
// brand, inverter brand, and storey height. Presenting a single figure
// creates price anchors that can damage trust if the actual quote differs.
// 'mid' is used for payback/savings calculations. 'low' and 'high' are
// displayed on the results page as the estimated range.
// Source: Tasmania industry benchmarks 2025–26. Review annually.
// ============================================================
export const SYSTEM_COSTS: Record<
	number,
	{
		grossLow: number;
		grossMid: number;
		grossHigh: number;
		stcRebate: number;
		netLow: number; // grossLow  − stcRebate
		netMid: number; // grossMid  − stcRebate (used in calculations)
		netHigh: number; // grossHigh − stcRebate
	}
> = {
	6.6: {
		grossLow: 7500,
		grossMid: 9064,
		grossHigh: 11000,
		stcRebate: 1564,
		netLow: 5936,
		netMid: 7500,
		netHigh: 9436
	},
	10: {
		grossLow: 10500,
		grossMid: 13000,
		grossHigh: 15500,
		stcRebate: 2000,
		netLow: 8500,
		netMid: 11000,
		netHigh: 13500
	},
	13.2: {
		grossLow: 14000,
		grossMid: 17500,
		grossHigh: 21000,
		stcRebate: 2500,
		netLow: 11500,
		netMid: 15000,
		netHigh: 18500
	}
};

// ============================================================
// PANEL CONSTANTS — For display on results page
// ============================================================
export const PANEL_WATTAGE = 415; // W — representative modern panel
export const PANEL_AREA_SQM = 1.8; // m² per panel (approx)

// ============================================================
// BATTERY CONSTANTS
// Round-trip efficiency of 0.90 (10% loss in charge/discharge cycle)
// is applied to captured kWh. The 0.85 capture factor accounts for
// the fact that on short winter days, available export may be minimal.
// ============================================================
export const BATTERY = {
	capacityKwh: 10,
	dailyMaxCaptureKwh: 10,
	roundTripEfficiency: 0.9, // 90% — energy lost in charge/discharge
	annualCaptureDiscount: 0.85, // Conservative factor: limited export on short winter days
	estimatedCost: 12000 // $ installed, post-incentive
};

// ============================================================
// ENVIRONMENTAL CONSTANTS
// Source: Clean Energy Council Australia
// ============================================================
export const KG_CO2_PER_KWH_GRID = 0.79;
export const KG_CO2_PER_TREE_PER_YEAR = 21;
export const KG_CO2_PER_CAR_PER_YEAR = 4600;
