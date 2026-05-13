import {
	DEFAULT_RETAIL_RATE,
	FEED_IN_TARIFF,
	ANNUAL_SUPPLY_CHARGE,
	ANNUAL_BILL_INFLATION_RATE,
	PANEL_DEGRADATION_RATE,
	KWH_PER_KW_PER_YEAR,
	DEFAULT_KWH_PER_KW_PER_YEAR,
	ORIENTATION_MULTIPLIERS,
	SEASONAL_MULTIPLIERS,
	SELF_CONSUMPTION_BASE,
	SC_MODIFIERS,
	SC_RATIO_CAP,
	SC_RATIO_FLOOR,
	SYSTEM_SIZE_MAP,
	AVAILABLE_SYSTEM_SIZES,
	SYSTEM_COSTS,
	PANEL_WATTAGE,
	PANEL_AREA_SQM,
	BATTERY,
	KG_CO2_PER_KWH_GRID,
	KG_CO2_PER_TREE_PER_YEAR,
	KG_CO2_PER_CAR_PER_YEAR
} from './constants';

// ── Input types ──────────────────────────────────────────────

export interface QuizInputs {
	// Step 2
	postcode: string;
	region:   string;

	// Step 3 — bill normalised to quarterly equivalent
	quarterlyBill: number;

	// Step 4 — Your Home (4 questions)
	occupancyProfile: 'all_day' | 'morning_evening' | 'night_only';
	householdSize:    '1_2' | '3_4' | '5_plus';
	homeSize:         'apartment' | 'medium' | 'large' | 'rural';
	roofOrientation:  'north' | 'north_east_west' | 'east_west' | 'south' | 'not_sure';

	// Step 5 — Appliances & EV
	hasElectricHotWater: boolean;
	hasDucatedHvac:      boolean;
	hasPool:             boolean;
	hasEvOwned:          boolean; // Affects system size only, NOT self-consumption ratio
	hasEvPlanned:        boolean; // Affects system size only

	// Step 6 — Battery
	batteryInterest: boolean;
}

// ── Output types ─────────────────────────────────────────────

export interface YearProjection {
	year:                   number;
	annualBillWithoutSolar: number; // $ — grid bill inflated at 3%
	annualBillWithSolar:    number; // $ — remaining grid cost after solar offset
	annualSavings:          number; // $ — offset savings (inflated) + FiT savings (flat) − degradation
	cumulativeSavings:      number; // $ — net of system cost (starts negative)
}

export interface BatteryScenario {
	additionalAnnualSavings: number;
	combinedAnnualSavings:   number;
	batteryCost:             number;
	batteryPaybackYears:     number;
}

export interface CalculationResult {
	// System
	systemSizeKw:           number;
	recommendedDescription: string;
	numberOfPanels:         number;
	roofAreaSqm:            number;

	// Yield
	annualYieldKwh:         number;
	dailyYieldKwh:          number;
	dailyExportKwh:         number;
	monthlyYieldKwh:        number[]; // 12 values Jan–Dec

	// Self-consumption
	selfConsumptionRatio:   number;
	annualSavedFromGrid:    number;   // kWh
	annualExportedToGrid:   number;   // kWh

	// Current bill context
	currentQuarterlyBill:   number;
	currentAnnualBill:      number;
	estimatedAnnualUsageKwh: number;
	annualSupplyCharge:     number;   // Fixed unavoidable charge — shown on results

	// Savings — Year 1
	annualSavings:          number;
	savingsFromOffset:      number;
	savingsFromExport:      number;
	newQuarterlyBill:       number;   // Cannot go below annualSupplyCharge / 4
	newAnnualBill:          number;   // Cannot go below annualSupplyCharge
	dailySolarCost:         number;

	// System cost (ranges)
	estimatedSystemCostMid:  number;  // Used in calculations
	estimatedSystemCostLow:  number;  // Displayed as range low
	estimatedSystemCostHigh: number;  // Displayed as range high
	stcRebate:               number;
	grossSystemCostMid:      number;

	// Payback
	simplePaybackYears:     number;

	// 25-year projections
	yearProjections:        YearProjection[];
	lifetimeSavings:        number;
	billYear1WithoutSolar:  number;
	billYear25WithoutSolar: number;
	billYear1WithSolar:     number;
	billYear25WithSolar:    number;

	// Environmental
	annualCO2OffsetKg:      number;
	treesEquivalent:        number;
	carsOffRoadEquivalent:  number;

	// Battery (only populated if batteryInterest === true)
	batteryScenario:        BatteryScenario | null;

	// Display flags
	isHighExport:           boolean; // true if export ratio > 0.55 — triggers contextual copy
	isViable:               boolean;
}

// ── Helpers ──────────────────────────────────────────────────

function stepUpSystemSize(currentKw: number): number {
	const idx = AVAILABLE_SYSTEM_SIZES.indexOf(currentKw as (typeof AVAILABLE_SYSTEM_SIZES)[number]);
	if (idx === -1 || idx === AVAILABLE_SYSTEM_SIZES.length - 1) return currentKw;
	return AVAILABLE_SYSTEM_SIZES[idx + 1];
}

export function normaliseToQuarterly(
	amount: number,
	period: 'monthly' | 'quarterly' | 'annually'
): number {
	if (period === 'monthly')  return amount * 3;
	if (period === 'annually') return amount / 4;
	return amount;
}

// ── Main calculation ──────────────────────────────────────────

export function calculate(inputs: QuizInputs): CalculationResult {

	// 1. BASE SYSTEM SIZE FROM BILL
	const tier =
		SYSTEM_SIZE_MAP.find(
			(t) => inputs.quarterlyBill >= t.quarterlyBillMin && inputs.quarterlyBill < t.quarterlyBillMax
		) ?? SYSTEM_SIZE_MAP[1];

	if (tier.baseSystemSizeKw === 0) {
		return buildNonViableResult(inputs.quarterlyBill);
	}

	let systemSizeKw = tier.baseSystemSizeKw;

	// 2. SYSTEM SIZE NUDGES
	// EV ownership nudges system size up (larger system for future EV charging capacity)
	// but does NOT affect self-consumption ratio (EVs typically charge overnight)
	if (inputs.householdSize === '5_plus' && systemSizeKw === 6.6) systemSizeKw = 10;
	if (inputs.hasEvOwned)                                          systemSizeKw = stepUpSystemSize(systemSizeKw);
	if (inputs.hasEvPlanned && !inputs.hasEvOwned)                  systemSizeKw = stepUpSystemSize(systemSizeKw);
	if (inputs.hasDucatedHvac && inputs.hasPool && systemSizeKw === 6.6) systemSizeKw = 10;

	// 3. SELF-CONSUMPTION RATIO
	// EV ownership is deliberately excluded from SC modifiers — see constants.ts note.
	let sc = SELF_CONSUMPTION_BASE[inputs.occupancyProfile] ?? SELF_CONSUMPTION_BASE.morning_evening;
	sc += SC_MODIFIERS.homeSize[inputs.homeSize] ?? 0;
	if (inputs.hasElectricHotWater) sc += SC_MODIFIERS.appliances.electricHotWater;
	if (inputs.hasDucatedHvac)      sc += SC_MODIFIERS.appliances.ducatedHvac;
	if (inputs.hasPool)             sc += SC_MODIFIERS.appliances.pool;
	sc = Math.min(sc, SC_RATIO_CAP);
	sc = Math.max(sc, SC_RATIO_FLOOR);

	// 4. ANNUAL YIELD — region-specific constant × orientation multiplier
	const baseYieldPerKw    = KWH_PER_KW_PER_YEAR[inputs.region] ?? DEFAULT_KWH_PER_KW_PER_YEAR;
	const orientationFactor = ORIENTATION_MULTIPLIERS[inputs.roofOrientation] ?? ORIENTATION_MULTIPLIERS['not_sure'];
	const annualYieldKwh    = systemSizeKw * baseYieldPerKw * orientationFactor;

	const annualSavedFromGrid  = annualYieldKwh * sc;
	const annualExportedToGrid = annualYieldKwh * (1 - sc);
	const dailyYieldKwh        = annualYieldKwh / 365;
	const dailyExportKwh       = annualExportedToGrid / 365;
	const isHighExport         = (1 - sc) > 0.55;

	// 5. MONTHLY YIELD (seasonal)
	const multipliers     = SEASONAL_MULTIPLIERS[inputs.region] ?? SEASONAL_MULTIPLIERS['hobart'];
	const avgMonthlyKwh   = annualYieldKwh / 12;
	const monthlyYieldKwh = multipliers.map((m) => Math.round(avgMonthlyKwh * m));

	// 6. YEAR 1 SAVINGS
	const savingsFromOffset = annualSavedFromGrid  * DEFAULT_RETAIL_RATE;
	const savingsFromExport = annualExportedToGrid * FEED_IN_TARIFF;
	const annualSavings     = savingsFromOffset + savingsFromExport;

	// 7. NEW BILL — floored at the unavoidable annual supply charge
	const currentAnnualBill        = inputs.quarterlyBill * 4;
	const estimatedAnnualUsageKwh  = Math.round(currentAnnualBill / DEFAULT_RETAIL_RATE);
	const saveableBill              = currentAnnualBill - ANNUAL_SUPPLY_CHARGE;
	const actualOffsetSavings       = Math.min(annualSavings, Math.max(0, saveableBill));
	const newAnnualBill             = ANNUAL_SUPPLY_CHARGE + Math.max(0, saveableBill - actualOffsetSavings);
	const newQuarterlyBill          = Math.round(newAnnualBill / 4);

	// 8. SYSTEM COST & PAYBACK
	const costData               = SYSTEM_COSTS[systemSizeKw] ?? SYSTEM_COSTS[6.6];
	const estimatedSystemCostMid  = costData.netMid;
	const estimatedSystemCostLow  = costData.netLow;
	const estimatedSystemCostHigh = costData.netHigh;
	const stcRebate               = costData.stcRebate;
	const grossSystemCostMid      = costData.grossMid;
	const simplePaybackYears      = estimatedSystemCostMid / annualSavings;
	const dailySolarCost          = estimatedSystemCostMid / (simplePaybackYears * 365);

	// 9. 25-YEAR PROJECTIONS
	// Grid offset savings are inflated at 3% per year (tariff escalation).
	// FiT export savings are held FLAT — the regulated FiT has declined year-on-year
	// and applying 3% inflation to it would overstate lifetime savings.
	// Panel degradation of 0.5%/year is applied to the yield in each year.
	const yearProjections: YearProjection[] = [];
	let cumulativeSavings = -estimatedSystemCostMid; // Year 0 outlay

	for (let y = 1; y <= 25; y++) {
		const degradationFactor   = Math.pow(1 - PANEL_DEGRADATION_RATE, y - 1);
		const gridInflationFactor = Math.pow(1 + ANNUAL_BILL_INFLATION_RATE, y - 1);

		const yearOffsetSavings   = savingsFromOffset * gridInflationFactor * degradationFactor;
		const yearExportSavings   = savingsFromExport * degradationFactor; // FiT: flat, degradation only
		const yearTotalSavings    = yearOffsetSavings + yearExportSavings;

		const annualBillWithoutSolar = Math.round(currentAnnualBill * gridInflationFactor);
		const annualBillWithSolar    = Math.max(
			Math.round(ANNUAL_SUPPLY_CHARGE),
			Math.round(annualBillWithoutSolar - yearTotalSavings)
		);
		cumulativeSavings += yearTotalSavings;

		yearProjections.push({
			year: y,
			annualBillWithoutSolar,
			annualBillWithSolar,
			annualSavings:     Math.round(yearTotalSavings),
			cumulativeSavings: Math.round(cumulativeSavings)
		});
	}

	const lifetimeSavings        = yearProjections[24].cumulativeSavings;
	const billYear1WithoutSolar  = yearProjections[0].annualBillWithoutSolar;
	const billYear25WithoutSolar = yearProjections[24].annualBillWithoutSolar;
	const billYear1WithSolar     = yearProjections[0].annualBillWithSolar;
	const billYear25WithSolar    = yearProjections[24].annualBillWithSolar;

	// 10. ENVIRONMENTAL
	const annualCO2OffsetKg     = Math.round(annualYieldKwh * KG_CO2_PER_KWH_GRID);
	const treesEquivalent       = Math.round(annualCO2OffsetKg / KG_CO2_PER_TREE_PER_YEAR);
	const carsOffRoadEquivalent = Math.round((annualCO2OffsetKg / KG_CO2_PER_CAR_PER_YEAR) * 10) / 10;

	// 11. PANEL COUNT & ROOF AREA
	const numberOfPanels = Math.ceil((systemSizeKw * 1000) / PANEL_WATTAGE);
	const roofAreaSqm    = Math.round(numberOfPanels * PANEL_AREA_SQM);

	// 12. BATTERY SCENARIO
	// Round-trip efficiency (0.90) and annual capture discount (0.85) applied
	// to avoid overstating battery value — particularly on short winter days.
	let batteryScenario: BatteryScenario | null = null;
	if (inputs.batteryInterest) {
		const rawCapturableKwh        = Math.min(annualExportedToGrid, BATTERY.dailyMaxCaptureKwh * 365);
		const adjustedCapturableKwh   = rawCapturableKwh * BATTERY.annualCaptureDiscount;
		const usableKwh               = adjustedCapturableKwh * BATTERY.roundTripEfficiency;
		const additionalAnnualSavings = Math.round(usableKwh * (DEFAULT_RETAIL_RATE - FEED_IN_TARIFF));
		const combinedAnnualSavings   = annualSavings + additionalAnnualSavings;
		const batteryPaybackYears     = Math.round((BATTERY.estimatedCost / additionalAnnualSavings) * 10) / 10;
		batteryScenario = {
			additionalAnnualSavings,
			combinedAnnualSavings,
			batteryCost: BATTERY.estimatedCost,
			batteryPaybackYears
		};
	}

	// 13. RECOMMENDED DESCRIPTION
	const recommendedDescription = buildDescription(systemSizeKw, tier.baseSystemSizeKw, inputs);

	return {
		systemSizeKw,
		recommendedDescription,
		numberOfPanels,
		roofAreaSqm,
		annualYieldKwh:           Math.round(annualYieldKwh),
		dailyYieldKwh:            Math.round(dailyYieldKwh * 10) / 10,
		dailyExportKwh:           Math.round(dailyExportKwh * 10) / 10,
		monthlyYieldKwh,
		selfConsumptionRatio:     Math.round(sc * 100) / 100,
		annualSavedFromGrid:      Math.round(annualSavedFromGrid),
		annualExportedToGrid:     Math.round(annualExportedToGrid),
		currentQuarterlyBill:     Math.round(inputs.quarterlyBill),
		currentAnnualBill:        Math.round(currentAnnualBill),
		estimatedAnnualUsageKwh,
		annualSupplyCharge:       Math.round(ANNUAL_SUPPLY_CHARGE),
		annualSavings:            Math.round(annualSavings),
		savingsFromOffset:        Math.round(savingsFromOffset),
		savingsFromExport:        Math.round(savingsFromExport),
		newQuarterlyBill,
		newAnnualBill:            Math.round(newAnnualBill),
		dailySolarCost:           Math.round(dailySolarCost * 100) / 100,
		estimatedSystemCostMid,
		estimatedSystemCostLow,
		estimatedSystemCostHigh,
		stcRebate,
		grossSystemCostMid,
		simplePaybackYears:       Math.round(simplePaybackYears * 10) / 10,
		yearProjections,
		lifetimeSavings,
		billYear1WithoutSolar,
		billYear25WithoutSolar,
		billYear1WithSolar,
		billYear25WithSolar,
		annualCO2OffsetKg,
		treesEquivalent,
		carsOffRoadEquivalent,
		batteryScenario,
		isHighExport,
		isViable: true
	};
}

function buildDescription(finalKw: number, baseKw: number, inputs: QuizInputs): string {
	if (finalKw === baseKw) {
		return (
			SYSTEM_SIZE_MAP.find((t) => t.baseSystemSizeKw === finalKw)?.recommendedDescription ??
			`A ${finalKw}kW system is recommended for your home.`
		);
	}
	const reasons: string[] = [];
	if (inputs.hasEvOwned || inputs.hasEvPlanned) reasons.push('EV charging capacity');
	if (inputs.householdSize === '5_plus')         reasons.push('your larger household');
	if (inputs.hasDucatedHvac && inputs.hasPool)   reasons.push('your high-demand appliances');
	const reasonStr = reasons.join(' and ');
	return `We've recommended a ${finalKw}kW system (up from ${baseKw}kW) to accommodate ${reasonStr} and future-proof your investment.`;
}

function buildNonViableResult(quarterlyBill: number): CalculationResult {
	const empty25: YearProjection[] = Array.from({ length: 25 }, (_, i) => ({
		year: i + 1,
		annualBillWithoutSolar: 0,
		annualBillWithSolar:    0,
		annualSavings:          0,
		cumulativeSavings:      0
	}));
	return {
		systemSizeKw: 0,
		recommendedDescription: 'not_recommended',
		numberOfPanels: 0,
		roofAreaSqm:    0,
		annualYieldKwh: 0,
		dailyYieldKwh:  0,
		dailyExportKwh: 0,
		monthlyYieldKwh: Array(12).fill(0),
		selfConsumptionRatio:    0,
		annualSavedFromGrid:     0,
		annualExportedToGrid:    0,
		currentQuarterlyBill:    Math.round(quarterlyBill),
		currentAnnualBill:       Math.round(quarterlyBill * 4),
		estimatedAnnualUsageKwh: 0,
		annualSupplyCharge:      Math.round(ANNUAL_SUPPLY_CHARGE),
		annualSavings:           0,
		savingsFromOffset:       0,
		savingsFromExport:       0,
		newQuarterlyBill:        0,
		newAnnualBill:           0,
		dailySolarCost:          0,
		estimatedSystemCostMid:  0,
		estimatedSystemCostLow:  0,
		estimatedSystemCostHigh: 0,
		stcRebate:               0,
		grossSystemCostMid:      0,
		simplePaybackYears:      0,
		yearProjections:         empty25,
		lifetimeSavings:         0,
		billYear1WithoutSolar:   0,
		billYear25WithoutSolar:  0,
		billYear1WithSolar:      0,
		billYear25WithSolar:     0,
		annualCO2OffsetKg:       0,
		treesEquivalent:         0,
		carsOffRoadEquivalent:   0,
		batteryScenario:         null,
		isHighExport:            false,
		isViable:                false
	};
}
