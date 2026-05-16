# Maximum Solar — Solar Savings Calculator
## Project Specification Document
**Version:** 3.0
**Client:** Maximum Solar (maximumsolar.com.au)
**Prepared by:** Codec Digital
**Status:** Active Reference Document
**Supersedes:** Version 2.0

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technical Stack](#2-technical-stack)
3. [Brand & Design Reference](#3-brand--design-reference)
4. [Architecture Overview](#4-architecture-overview)
5. [Data Layer — Constants & Calculation Engine](#5-data-layer--constants--calculation-engine)
6. [Quiz Flow — User Journey](#6-quiz-flow--user-journey)
7. [Calculation Logic](#7-calculation-logic)
8. [Results Dashboard](#8-results-dashboard)
9. [Lead Capture & Email Handling](#9-lead-capture--email-handling)
10. [File & Folder Structure](#10-file--folder-structure)
11. [Component Specifications](#11-component-specifications)
12. [Edge Cases & Error Handling](#12-edge-cases--error-handling)
13. [Legal & Compliance Requirements](#13-legal--compliance-requirements)
14. [Environment Variables](#14-environment-variables)
15. [Deployment Notes](#15-deployment-notes)
16. [Phase 2 Considerations](#16-phase-2-considerations)

---

## 1. Project Overview

### Purpose
A solar savings calculator embedded as a standalone page on the Maximum Solar website (`maximumsolar.com.au/calculator`). Its primary function is **lead generation** — capturing high-intent homeowner contact details in exchange for a personalised savings estimate. The secondary function is **consumer education**, building trust with transparent, Tasmanian-specific financial projections.

### Success Criteria
- User completes the quiz and submits contact details (primary conversion)
- User opts into the email report (secondary conversion signal)
- Maximum Solar team receives a lead notification email with full summary
- The user receives a formatted HTML results email (if opted in)
- All calculations are defensible, Tasmanian-specific, and disclosed as estimates

### Calculation Philosophy
All estimates are intentionally **conservative rather than optimistic**. Every assumption is set at or below the midpoint of the reasonable range. The goal is that a customer who proceeds to a site assessment arrives with calibrated expectations that Maximum Solar can meet or exceed — not inflated expectations that create disappointment. A conservative estimate that leads to a pleasant surprise is better than an optimistic estimate that leads to a complaint.

### Out of Scope (MVP)
- LiDAR / satellite roof mapping
- Solcast or PVWatts API integration
- NEM12 interval data upload
- PDF report generation
- VPP (Virtual Power Plant) modelling
- Commercial solar calculations

---

## 2. Technical Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit |
| Hosting | Vercel |
| UI Components | shadcn-svelte |
| Styling | TailwindCSS |
| Charts | shadcn-svelte Charts (built on Recharts / LayerChart) |
| Email | Resend |
| Language | TypeScript |
| State | Svelte 5 runes (`$state`, `$derived` — client-side only, no persistence) |
| Forms | SvelteKit form actions (`+page.server.ts`) |

### Key Architectural Decisions
- **All calculation logic runs client-side.** No server round-trip is needed for the estimate. The server action is used exclusively for the Resend email dispatch triggered on lead form submission.
- **No database.** Lead data is dispatched via email only. If a CRM integration is required in future, it is added to the server action.
- **No external APIs at MVP.** All solar yield data uses static, researched constants. This eliminates latency, API cost, and failure modes.
- **Tariff and rate data is isolated** in a single `constants.ts` file for easy annual maintenance.

---

## 3. Brand & Design Reference

### Live Site
`https://www.maximumsolar.com.au`

The existing site is built in SvelteKit with TailwindCSS and shadcn-svelte. The calculator must match the existing site's visual language precisely.

### Brand Observations (from live site audit)

**Colour palette:**
- Primary background: White / very light grey
- Primary text: Near-black (dark charcoal)
- Accent / CTA: Bold gold (`#FFC640` — confirmed from `app.css`)
- Secondary accent: Deep navy / dark blue used in section backgrounds
- Trust badges use muted greys

**Typography:**
- The site uses a clean, modern sans-serif. Match the existing font stack.
- Headings are bold and direct. Body copy is concise.

**Tone & Voice:**
- Direct, Tasmanian-local, trustworthy. Not salesy.
- Uses phrases like "Be the Change. Save the Change." — punchy and values-driven.
- Avoids technical jargon at the surface level.

**Design Principles for Calculator:**
- Follow the existing site aesthetic — do not introduce a new visual language.
- The quiz should feel like a natural extension of the existing page style.
- Progress indication should be subtle but clear.
- The results dashboard should feel premium — the "big number" is the hero.
- Use shadcn-svelte chart components where data visualisation is appropriate.
- Every interactive element should match the existing site's button and input styles.

---

## 4. Architecture Overview

### Route Structure
```
/calculator
  +page.svelte          ← Quiz UI + Results Dashboard (same route)
  +page.server.ts       ← Form action: Resend dispatch only
```

### Page State Machine
The page has two states controlled by a boolean (`resultsVisible`):
1. **Quiz State** — step-by-step questionnaire, progress tracked via Svelte 5 runes
2. **Results State** — results dashboard rendered once lead form is submitted

There is **no separate route** for results. The transition from quiz to results happens on the same `/calculator` route. This retains the results without complex caching or URL state management. Scrolling the page up after results appear is handled with `scrollTo(0,0)` on the state transition.

### Data Flow
```
User inputs (quiz steps)
  → QuizState ($state rune)
    → calculator.ts (pure functions, runs on final step)
      → CalculationResult ($derived rune)
        → ResultsDashboard.svelte (display)
          → LeadCaptureForm.svelte (user submits contact details)
            → +page.server.ts (server action)
              → Resend: internal notification to info@maximumsolar.com.au
              → Resend: HTML results email to user (if opted in)
```

---

## 5. Data Layer — Constants & Calculation Engine

### 5.1 File: `src/lib/solar/constants.ts`

This file is the **single source of truth for all financial and technical data**. It must be reviewed and updated annually when Aurora Energy revises tariffs (typically July each year).

```typescript
// ============================================================
// AURORA ENERGY TARIFF DATA — Review annually (effective July)
// Last updated: July 2025
// Source: https://www.auroraenergy.com.au/residential/products/tariffs
// ============================================================

export const TARIFFS = {
  flatRate: {
    label: 'Flat Rate (Tariff 31/41)',
    dailySupplyCharge: 1.5410,   // $ per day
    usageRate: 0.2557,           // $ per kWh (all units)
    offPeakRate: null,
  },
  timeOfUse: {
    label: 'Time of Use (Tariff 93)',
    dailySupplyCharge: 1.5118,   // $ per day — CANNOT be offset by solar
    peakRate: 0.3548,            // $ per kWh (weekdays 7–10am, 4–9pm)
    offPeakRate: 0.1669,         // $ per kWh (all other times, all weekend)
    blendedRate: 0.2535,         // $ per kWh (derived weighted average ~60% off-peak, ~40% peak)
  },
  heatingHotWater: {
    label: 'Heating/Hot Water (Tariff 41)',
    dailySupplyCharge: 0.2130,
    usageRate: 0.1983,
    offPeakRate: null,
  },
} as const;

// NOTE: When solar is installed in Tasmania, households are moved onto Tariff 93.
// The blendedRate is used for MVP calculations as we do not have interval data.
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
// NOT applied to the FiT export component. See §7 Step 8 for detail.
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
  hobart:     1150,  // Conservative for Hobart's latitude and climate
  launceston: 1220,  // Marginally better irradiance than Hobart
  burnie:     1180,  // Between Hobart and Launceston
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
  north:           1.00,
  north_east_west: 0.90,
  east_west:       0.82,
  south:           0.65,
  not_sure:        0.88,  // Conservative assumption for unknown orientation
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
  hobart:     [1.45, 1.35, 1.15, 0.90, 0.70, 0.58, 0.62, 0.75, 0.95, 1.15, 1.30, 1.40],
  launceston: [1.45, 1.35, 1.15, 0.92, 0.72, 0.60, 0.64, 0.77, 0.97, 1.17, 1.32, 1.42],
  burnie:     [1.42, 1.32, 1.12, 0.88, 0.68, 0.56, 0.60, 0.73, 0.93, 1.13, 1.28, 1.38],
};

// ============================================================
// REGIONAL DATA — Sun hours and postcode mapping
// ============================================================
export const REGIONS: Record<string, { label: string; peakSunHours: number; postcodes: number[] }> = {
  hobart: {
    label: 'Hobart',
    peakSunHours: 3.8,
    postcodes: [
      7000,7001,7004,7005,7007,7008,7009,7010,7011,7012,7015,7016,7017,7018,7019,
      7020,7021,7022,7023,7024,7025,7026,7027,7050,7051,7052,7053,7054,7055,
      7109,7110,7112,7116,7117,7119,7120,7121,7139,7140,7150,7151,7152,7155,
      7162,7163,7170,7171,7172,7173,7174,7175,7176,7177,7178,7179,7180,7182,
      7183,7184,7185,7186,7187,7188,7189,7190,7191,7192,7193,7194,7195,
    ],
  },
  launceston: {
    label: 'Launceston & North',
    peakSunHours: 3.9,
    postcodes: [
      7248,7249,7250,7251,7252,7253,7254,7255,7256,7257,7258,7259,7260,7261,
      7262,7263,7264,7265,7267,7268,7269,7270,7275,7276,7277,7290,7291,7292,
      7300,7301,7302,7303,7304,7305,7306,7307,7310,7315,7316,7320,7321,7322,
      7325,7330,
    ],
  },
  burnie: {
    label: 'Burnie & North-West',
    peakSunHours: 3.7,
    postcodes: [
      7320,7321,7322,7325,7330,7331,7470,7462,7466,7467,7468,7469,7460,7461,
      7315,7316,7312,7313,7314,
    ],
  },
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
    recommendedDescription: 'not_recommended',
  },
  {
    quarterlyBillMin: 300,
    quarterlyBillMax: 500,
    label: '$300 – $500',
    baseSystemSizeKw: 6.6,
    recommendedDescription: 'A 6.6kW system is ideal for your usage level — Tasmania\'s most popular residential system.',
  },
  {
    quarterlyBillMin: 500,
    quarterlyBillMax: 700,
    label: '$500 – $700',
    baseSystemSizeKw: 6.6,
    recommendedDescription: 'A 6.6kW system will offset a substantial portion of your bill, with room to grow.',
  },
  {
    quarterlyBillMin: 700,
    quarterlyBillMax: 1000,
    label: '$700 – $1,000',
    baseSystemSizeKw: 10,
    recommendedDescription: 'A 10kW system is recommended for your household\'s energy needs.',
  },
  {
    quarterlyBillMin: 1000,
    quarterlyBillMax: Infinity,
    label: 'Over $1,000',
    baseSystemSizeKw: 13.2,
    recommendedDescription: 'A 13.2kW system is recommended — designed for high-consumption homes.',
  },
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
  all_day:         0.45,  // Occupied all day, no active load management
  morning_evening: 0.30,  // Away during peak solar hours (9am–3pm)
  night_only:      0.15,  // Rarely home during daylight hours
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
    apartment: -0.05,  // Less always-on load
    medium:     0.00,  // Baseline
    large:     +0.05,  // More always-on load (fridges, standby, etc.)
    rural:     +0.08,  // Equipment loads, pumps, sheds often daytime
  },
  appliances: {
    electricHotWater: +0.05,  // Can be timer-shifted to solar hours
    ducatedHvac:      +0.08,  // High daytime draw in shoulder seasons
    pool:             +0.05,  // Pump typically runs during daylight
    // evOwned is intentionally ABSENT — see note above
  },
} as const;

export const SC_RATIO_CAP = 0.85;
export const SC_RATIO_FLOOR = 0.10;

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
export const SYSTEM_COSTS: Record<number, {
  grossLow:   number;
  grossMid:   number;
  grossHigh:  number;
  stcRebate:  number;
  netLow:     number;   // grossLow − stcRebate
  netMid:     number;   // grossMid − stcRebate (used in calculations)
  netHigh:    number;   // grossHigh − stcRebate
}> = {
  6.6: {
    grossLow:  7500,  grossMid:  9064,  grossHigh: 11000,
    stcRebate: 1564,
    netLow:    5936,  netMid:    7500,  netHigh:   9436,
  },
  10: {
    grossLow:  10500, grossMid:  13000, grossHigh: 15500,
    stcRebate: 2000,
    netLow:    8500,  netMid:    11000, netHigh:   13500,
  },
  13.2: {
    grossLow:  14000, grossMid:  17500, grossHigh: 21000,
    stcRebate: 2500,
    netLow:    11500, netMid:    15000, netHigh:   18500,
  },
};

// ============================================================
// PANEL CONSTANTS — For display on results page
// ============================================================
export const PANEL_WATTAGE  = 415;   // W — representative modern panel
export const PANEL_AREA_SQM = 1.8;   // m² per panel (approx)

// ============================================================
// BATTERY CONSTANTS
// Round-trip efficiency of 0.90 (10% loss in charge/discharge cycle)
// is applied to captured kWh. The 0.85 capture factor accounts for
// the fact that on short winter days, available export may be minimal.
// ============================================================
export const BATTERY = {
  capacityKwh:          10,
  dailyMaxCaptureKwh:   10,
  roundTripEfficiency:  0.90,   // 90% — energy lost in charge/discharge
  annualCaptureDiscount: 0.85,  // Conservative factor: limited export on short winter days
  estimatedCost:        12000,  // $ installed, post-incentive
};

// ============================================================
// ENVIRONMENTAL CONSTANTS
// Source: Clean Energy Council Australia
// ============================================================
export const KG_CO2_PER_KWH_GRID      = 0.79;
export const KG_CO2_PER_TREE_PER_YEAR = 21;
export const KG_CO2_PER_CAR_PER_YEAR  = 4600;
```

---

### 5.2 File: `src/lib/solar/postcodes.ts`

No changes from v2.0.

```typescript
import { REGIONS, DEFAULT_REGION } from './constants';

export function getRegionFromPostcode(postcode: string): string {
  const code = parseInt(postcode, 10);
  for (const [key, region] of Object.entries(REGIONS)) {
    if (region.postcodes.includes(code)) return key;
  }
  return DEFAULT_REGION;
}

export function isValidTasmanianPostcode(postcode: string): boolean {
  const code = parseInt(postcode, 10);
  return code >= 7000 && code <= 7999 && postcode.length === 4;
}
```

---

### 5.3 File: `src/lib/solar/calculator.ts`

```typescript
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
  KG_CO2_PER_CAR_PER_YEAR,
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
  hasEvOwned:          boolean;   // Affects system size only, NOT self-consumption ratio
  hasEvPlanned:        boolean;   // Affects system size only

  // Step 6 — Battery
  batteryInterest: boolean;
}

// ── Output types ─────────────────────────────────────────────

export interface YearProjection {
  year:                    number;
  annualBillWithoutSolar:  number;  // $ — grid bill inflated at 3%
  annualBillWithSolar:     number;  // $ — remaining grid cost after solar offset
  annualSavings:           number;  // $ — offset savings (inflated) + FiT savings (flat) − degradation
  cumulativeSavings:       number;  // $ — net of system cost (starts negative)
}

export interface BatteryScenario {
  additionalAnnualSavings: number;
  combinedAnnualSavings:   number;
  batteryCost:             number;
  batteryPaybackYears:     number;
}

export interface CalculationResult {
  // System
  systemSizeKw:            number;
  recommendedDescription:  string;
  numberOfPanels:          number;
  roofAreaSqm:             number;

  // Yield
  annualYieldKwh:          number;
  dailyYieldKwh:           number;
  dailyExportKwh:          number;
  monthlyYieldKwh:         number[];   // 12 values Jan–Dec

  // Self-consumption
  selfConsumptionRatio:    number;
  annualSavedFromGrid:     number;     // kWh
  annualExportedToGrid:    number;     // kWh

  // Current bill context
  currentQuarterlyBill:    number;
  currentAnnualBill:       number;
  estimatedAnnualUsageKwh: number;
  annualSupplyCharge:      number;     // Fixed unavoidable charge — shown on results

  // Savings — Year 1
  annualSavings:           number;
  savingsFromOffset:       number;
  savingsFromExport:       number;
  newQuarterlyBill:        number;     // Cannot go below annualSupplyCharge / 4
  newAnnualBill:           number;     // Cannot go below annualSupplyCharge
  dailySolarCost:          number;

  // System cost (ranges)
  estimatedSystemCostMid:  number;     // Used in calculations
  estimatedSystemCostLow:  number;     // Displayed as range low
  estimatedSystemCostHigh: number;     // Displayed as range high
  stcRebate:               number;
  grossSystemCostMid:      number;

  // Payback
  simplePaybackYears:      number;

  // 25-year projections
  yearProjections:         YearProjection[];
  lifetimeSavings:         number;
  billYear1WithoutSolar:   number;
  billYear25WithoutSolar:  number;
  billYear1WithSolar:      number;
  billYear25WithSolar:     number;

  // Environmental
  annualCO2OffsetKg:       number;
  treesEquivalent:         number;
  carsOffRoadEquivalent:   number;

  // Battery (only populated if batteryInterest === true)
  batteryScenario:         BatteryScenario | null;

  // Display flags
  isHighExport:            boolean;    // true if export ratio > 0.55 — triggers contextual copy
  isViable:                boolean;
}

// ── Helpers ──────────────────────────────────────────────────

function stepUpSystemSize(currentKw: number): number {
  const idx = AVAILABLE_SYSTEM_SIZES.indexOf(currentKw as typeof AVAILABLE_SYSTEM_SIZES[number]);
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
  const tier = SYSTEM_SIZE_MAP.find(
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
  if (inputs.hasEvOwned)                    systemSizeKw = stepUpSystemSize(systemSizeKw);
  if (inputs.hasEvPlanned && !inputs.hasEvOwned) systemSizeKw = stepUpSystemSize(systemSizeKw);
  if (inputs.hasDucatedHvac && inputs.hasPool && systemSizeKw === 6.6) systemSizeKw = 10;

  // 3. SELF-CONSUMPTION RATIO
  // EV ownership is deliberately excluded from SC modifiers — see constants.ts note.
  let sc = SELF_CONSUMPTION_BASE[inputs.occupancyProfile];
  sc += SC_MODIFIERS.homeSize[inputs.homeSize];
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
  const isHighExport         = (1 - sc) > 0.55; // Used to trigger contextual copy

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
  const saveableBill             = currentAnnualBill - ANNUAL_SUPPLY_CHARGE;
  const actualOffsetSavings      = Math.min(annualSavings, Math.max(0, saveableBill));
  const newAnnualBill            = ANNUAL_SUPPLY_CHARGE + Math.max(0, saveableBill - actualOffsetSavings);
  const newQuarterlyBill         = Math.round(newAnnualBill / 4);

  // 8. SYSTEM COST & PAYBACK
  const costData              = SYSTEM_COSTS[systemSizeKw] ?? SYSTEM_COSTS[6.6];
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
    const degradationFactor      = Math.pow(1 - PANEL_DEGRADATION_RATE, y - 1);
    const gridInflationFactor    = Math.pow(1 + ANNUAL_BILL_INFLATION_RATE, y - 1);

    // Apply degradation to the base yield for this year
    const yearOffsetSavings      = savingsFromOffset * gridInflationFactor * degradationFactor;
    const yearExportSavings      = savingsFromExport * degradationFactor; // FiT: flat, degradation only
    const yearTotalSavings       = yearOffsetSavings + yearExportSavings;

    const annualBillWithoutSolar = Math.round(currentAnnualBill * gridInflationFactor);
    const annualBillWithSolar    = Math.max(
      Math.round(ANNUAL_SUPPLY_CHARGE),
      Math.round(annualBillWithoutSolar - yearTotalSavings)
    );
    cumulativeSavings           += yearTotalSavings;

    yearProjections.push({
      year: y,
      annualBillWithoutSolar,
      annualBillWithSolar,
      annualSavings:    Math.round(yearTotalSavings),
      cumulativeSavings: Math.round(cumulativeSavings),
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
      batteryPaybackYears,
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
    isViable: true,
  };
}

function buildDescription(finalKw: number, baseKw: number, inputs: QuizInputs): string {
  if (finalKw === baseKw) {
    return SYSTEM_SIZE_MAP.find((t) => t.baseSystemSizeKw === finalKw)?.recommendedDescription
      ?? `A ${finalKw}kW system is recommended for your home.`;
  }
  const reasons: string[] = [];
  if (inputs.hasEvOwned || inputs.hasEvPlanned) reasons.push('EV charging capacity');
  if (inputs.householdSize === '5_plus')        reasons.push('your larger household');
  if (inputs.hasDucatedHvac && inputs.hasPool)  reasons.push('your high-demand appliances');
  const reasonStr = reasons.join(' and ');
  return `We've recommended a ${finalKw}kW system (up from ${baseKw}kW) to accommodate ${reasonStr} and future-proof your investment.`;
}

function buildNonViableResult(quarterlyBill: number): CalculationResult {
  const empty25: YearProjection[] = Array.from({ length: 25 }, (_, i) => ({
    year: i + 1, annualBillWithoutSolar: 0, annualBillWithSolar: 0,
    annualSavings: 0, cumulativeSavings: 0,
  }));
  return {
    systemSizeKw: 0, recommendedDescription: 'not_recommended',
    numberOfPanels: 0, roofAreaSqm: 0,
    annualYieldKwh: 0, dailyYieldKwh: 0, dailyExportKwh: 0,
    monthlyYieldKwh: Array(12).fill(0),
    selfConsumptionRatio: 0, annualSavedFromGrid: 0, annualExportedToGrid: 0,
    currentQuarterlyBill: Math.round(quarterlyBill),
    currentAnnualBill: Math.round(quarterlyBill * 4),
    estimatedAnnualUsageKwh: 0,
    annualSupplyCharge: Math.round(ANNUAL_SUPPLY_CHARGE),
    annualSavings: 0, savingsFromOffset: 0, savingsFromExport: 0,
    newQuarterlyBill: 0, newAnnualBill: 0, dailySolarCost: 0,
    estimatedSystemCostMid: 0, estimatedSystemCostLow: 0, estimatedSystemCostHigh: 0,
    stcRebate: 0, grossSystemCostMid: 0, simplePaybackYears: 0,
    yearProjections: empty25, lifetimeSavings: 0,
    billYear1WithoutSolar: 0, billYear25WithoutSolar: 0,
    billYear1WithSolar: 0, billYear25WithSolar: 0,
    annualCO2OffsetKg: 0, treesEquivalent: 0, carsOffRoadEquivalent: 0,
    batteryScenario: null, isHighExport: false, isViable: false,
  };
}
```

---

## 6. Quiz Flow — User Journey

### Overview
The quiz consists of **7 steps** rendered sequentially. Step 4 now contains **4 questions** (up from 3) to capture roof orientation. Total questions: **11**.

---

**Step 1 — Eligibility Check**
> "Do you own your home in Tasmania?"

- Options: `Yes, I own my home` | `I rent` | `I'm a business owner`
- `I rent` → Renter exit (§12) | `I'm a business owner` → Commercial exit (§12)

---

**Step 2 — Location**
> "What's your postcode?"

- 4-digit numeric input. Validated as Tasmanian (7000–7999).
- Maps to region via `getRegionFromPostcode()`.
- Out-of-state → OutOfArea exit (§12)

---

**Step 3 — Energy Usage**
> "What's your electricity bill?"

- Free text amount + billing period selector (`Monthly` / `Quarterly` / `Annually`)
- Quick-select chips: `Under $300` | `$300–$500` | `$500–$700` | `$700–$1,000` | `Over $1,000` | `Not sure`
- Chips populate the field with the range midpoint at quarterly period
- `Not sure` → $500 quarterly default. Results note this assumption.
- Normalised to quarterly via `normaliseToQuarterly()` on proceed

---

**Step 4 — Your Home**
> "Tell us about your home"

Four questions on one screen. All required to proceed.

**Question A:** "When is your home most active?"
- `All day` → `all_day` | `Mornings & evenings` → `morning_evening` | `Mostly at night` → `night_only`

**Question B:** "How many people live in your home?"
- `1–2 people` → `1_2` | `3–4 people` → `3_4` | `5+ people` → `5_plus`

**Question C:** "What best describes your home?"
- `Apartment or unit` *(under 120m²)* → `apartment`
- `Medium home` *(120–250m²)* → `medium`
- `Large home` *(250m²+)* → `large`
- `Rural or acreage` → `rural`

**Question D — NEW:** "Which direction does your main roof face?"
- Type: Single select (visual cards, ideally with a simple compass diagram)
- `Mainly north` → `north`
- `North-east or north-west` → `north_east_west`
- `East or west` → `east_west`
- `Mainly south` → `south`
- `Not sure` → `not_sure`
- Helper text: *"Face your home from the street — which way does the largest roof area point?"*
- `Not sure` applies a conservative 0.88 multiplier to yield (reflects typical suburban mix)

---

**Step 5 — Appliances & EV**
> "Tell us about your appliances and future plans"

**Question A:** "Does your home have any of the following?" (multi-select)
- `Electric hot water system` → `hasElectricHotWater`
- `Ducted heating or air conditioning` → `hasDucatedHvac`
- `Swimming pool or spa` → `hasPool`
- `Electric vehicle (already owned)` → `hasEvOwned`
- `None of the above` — mutually exclusive

**Question B:** "Do you plan to get an electric vehicle in the next 1–2 years?"
- `Yes` → `hasEvPlanned = true` | `No` → `hasEvPlanned = false`
- `Already have one` → sets `hasEvOwned = true`
- Hidden if `hasEvOwned` already selected

> **Implementation note:** EV ownership affects the system size recommendation (steps up one tier to accommodate future charging capacity) but does **not** affect the self-consumption ratio. This is correct behaviour — EVs are predominantly charged overnight, not during solar generation hours.

---

**Step 6 — Battery Interest**
> "Are you interested in adding battery storage?"

- `Yes — show me the savings` → `batteryInterest = true`
- `Maybe later` → `batteryInterest = false`, flagged as sales signal in internal email
- `No thanks` → `batteryInterest = false`

---

**Step 7 — Lead Capture**
> "See your personalised savings estimate"

- Fields: First name, last name, email, phone
- Checkbox: "Email me a copy of my results" (opt-in, unchecked by default)
- Submit: `"See My Savings →"`
- Privacy copy beneath button

---

### Progress Bar
- Shown on Steps 1–7. Shows `"Step X of 7"` + animated fill bar.
- Hidden on all exit screens.

---

## 7. Calculation Logic

### Overview of Calculation Pipeline

```
1.  Normalise bill to quarterly equivalent
2.  Derive base system size from bill
3.  Apply system size nudges (household size, EV, appliances)
4.  Calculate self-consumption ratio (base + home/appliance modifiers)
    NOTE: EV ownership does NOT modify SC ratio
5.  Calculate annual yield (region yield constant × orientation multiplier)
6.  Calculate monthly yield breakdown (seasonal multipliers)
7.  Calculate Year 1 savings (offset + export components separately)
8.  Derive new bill — floored at annual supply charge (~$552)
9.  Calculate system cost range (low/mid/high), STC rebate, payback, daily cost
10. Build 25-year projection:
      - Grid offset savings: inflated 3%/year
      - FiT export savings: held flat (declining trend in reality)
      - Both streams: degraded 0.5%/year for panel degradation
      - New bill each year: floored at supply charge
11. Calculate environmental metrics
12. Calculate battery scenario with efficiency and capture discount applied
13. Return CalculationResult
```

---

### Step 1: Bill Normalisation

```
monthly   → × 3  = quarterly
annually  → ÷ 4  = quarterly
quarterly → unchanged
```

---

### Step 2: Base System Size

Normalised quarterly bill matched against `SYSTEM_SIZE_MAP` → `baseSystemSizeKw`.

---

### Step 3: System Size Nudges

| Condition | Action |
|---|---|
| `householdSize === '5_plus'` AND base is `6.6kW` | Set to `10kW` |
| `hasEvOwned === true` | Step up one tier |
| `hasEvPlanned === true` (no owned EV) | Step up one tier |
| `hasDucatedHvac && hasPool` AND current is `6.6kW` | Set to `10kW` |

Tier order: `[6.6, 10, 13.2]`. Cannot exceed 13.2kW.

---

### Step 4: Self-Consumption Ratio

```
sc = SELF_CONSUMPTION_BASE[occupancyProfile]   // 0.45 / 0.30 / 0.15
   + SC_MODIFIERS.homeSize[homeSize]
   + (hasElectricHotWater ? +0.05 : 0)
   + (hasDucatedHvac      ? +0.08 : 0)
   + (hasPool             ? +0.05 : 0)
   // hasEvOwned is NOT included here — EV charging is nocturnal

sc = clamp(sc, floor: 0.10, cap: 0.85)
```

**Base ratios (conservative, unoptimised behaviour):**

| Occupancy | Base SC | Rationale |
|---|---|---|
| All day | 0.45 | Occupied home, no active load management |
| Mornings & evenings | 0.30 | Away during peak generation (9am–3pm) |
| Night only | 0.15 | Rarely home during daylight |

**Home size modifiers:**

| Home type | Modifier |
|---|---|
| Apartment/unit | −0.05 |
| Medium home | 0.00 |
| Large home | +0.05 |
| Rural/acreage | +0.08 |

**Appliance modifiers:**

| Appliance | Modifier |
|---|---|
| Electric hot water | +0.05 |
| Ducted HVAC | +0.08 |
| Pool/spa | +0.05 |
| EV owned | Not applied (see note above) |

---

### Step 5: Annual Yield

```
baseYieldPerKw   = KWH_PER_KW_PER_YEAR[region]   // 1,150 / 1,220 / 1,180
orientationFactor = ORIENTATION_MULTIPLIERS[roofOrientation]
annualYieldKwh   = systemSizeKw × baseYieldPerKw × orientationFactor

annualSavedFromGrid  = annualYieldKwh × sc
annualExportedToGrid = annualYieldKwh × (1 − sc)
isHighExport         = (1 − sc) > 0.55   // flag for contextual copy
```

**Orientation multipliers:**

| Orientation | Multiplier |
|---|---|
| Mainly north | 1.00 |
| North-east or north-west | 0.90 |
| East or west | 0.82 |
| Mainly south | 0.65 |
| Not sure | 0.88 (conservative assumption) |

---

### Step 6: Monthly Breakdown

```
avgMonthlyKwh      = annualYieldKwh / 12
monthlyYieldKwh[i] = avgMonthlyKwh × SEASONAL_MULTIPLIERS[region][i]
```

---

### Step 7: Year 1 Savings

```
savingsFromOffset = annualSavedFromGrid  × $0.2535
savingsFromExport = annualExportedToGrid × $0.08782
annualSavings     = savingsFromOffset + savingsFromExport
```

---

### Step 8: New Bill (Supply Charge Floor)

```
ANNUAL_SUPPLY_CHARGE = $551.81   (Tariff 93: $1.5118/day × 365)

saveableBill          = currentAnnualBill − ANNUAL_SUPPLY_CHARGE
actualOffsetSavings   = min(annualSavings, max(0, saveableBill))
newAnnualBill         = ANNUAL_SUPPLY_CHARGE + max(0, saveableBill − actualOffsetSavings)
newQuarterlyBill      = newAnnualBill / 4

// The new bill CANNOT go below $551.81/year regardless of system size.
// This fixed charge must be shown on the results page to set honest expectations.
```

---

### Step 9: System Cost & Payback

```
estimatedSystemCostMid  = SYSTEM_COSTS[systemSizeKw].netMid   // used in calculations
estimatedSystemCostLow  = SYSTEM_COSTS[systemSizeKw].netLow   // displayed as range
estimatedSystemCostHigh = SYSTEM_COSTS[systemSizeKw].netHigh  // displayed as range
stcRebate               = SYSTEM_COSTS[systemSizeKw].stcRebate

simplePaybackYears = estimatedSystemCostMid / annualSavings
dailySolarCost     = estimatedSystemCostMid / (simplePaybackYears × 365)
```

---

### Step 10: 25-Year Projections

Two separate savings streams are projected independently, then combined:

```
for year y = 1 to 25:

  degradationFactor   = (1 − 0.005) ^ (y − 1)       // 0.5%/year panel degradation
  gridInflation       = (1.03) ^ (y − 1)             // 3%/year — offset stream only

  yearOffsetSavings   = savingsFromOffset × gridInflation × degradationFactor
  yearExportSavings   = savingsFromExport × degradationFactor  // FiT held flat
  yearTotalSavings    = yearOffsetSavings + yearExportSavings

  annualBillWithoutSolar = currentAnnualBill × gridInflation
  annualBillWithSolar    = max(ANNUAL_SUPPLY_CHARGE, annualBillWithoutSolar − yearTotalSavings)

  cumulativeSavings     += yearTotalSavings   // starts at −estimatedSystemCostMid at Year 0
```

**Why two streams?**
- The grid retail rate has risen historically at ~3%/year — applying inflation to offset savings is appropriate.
- The regulated FiT has fallen year-on-year (10.869c → 8.935c → 8.782c). Applying 3% inflation to it would overstate lifetime savings. It is held flat as a conservative assumption.

---

### Step 11: Environmental Metrics

```
annualCO2OffsetKg     = annualYieldKwh × 0.79
treesEquivalent       = annualCO2OffsetKg / 21
carsOffRoadEquivalent = annualCO2OffsetKg / 4,600
```

---

### Step 12: Battery Scenario

```
rawCapturableKwh      = min(annualExportedToGrid, 10kWh × 365)
adjustedCapturableKwh = rawCapturableKwh × 0.85    // conservative capture discount
usableKwh             = adjustedCapturableKwh × 0.90  // round-trip efficiency
additionalSavings     = usableKwh × ($0.2535 − $0.08782)
combinedAnnualSavings = annualSavings + additionalSavings
batteryPaybackYears   = $12,000 / additionalSavings
```

Displayed as a **parallel card** alongside solar-only figures. Not included in primary metrics.

---

### Panel Count & Roof Area (Display Only)

```
numberOfPanels = ceil((systemSizeKw × 1,000) / 415)
roofAreaSqm    = numberOfPanels × 1.8
```

---

## 8. Results Dashboard

---

### 8.1 Hero — Primary Savings Figure
- **Headline:** "Your Estimated Annual Savings"
- **Primary value:** `$annualSavings` — large, bold display
- **Secondary figure:** `"$lifetimeSavings over 25 years"`
- **Subtext:** System + location + orientation — *"Based on a X.XkW [orientation]-facing system for your home in [Region]"*
- Background: Brand gold (`#FFC640`), high contrast

---

### 8.2 Before / After Bill Comparison
Two-column card:

| | Now | After Solar |
|---|---|---|
| Quarterly bill | `$currentQuarterlyBill` | `$newQuarterlyBill` |
| Annual bill | `$currentAnnualBill` | `$newAnnualBill` |

Supply charge note (always shown): *"Your estimated bill includes a fixed daily supply charge of ~$1.51/day (~$552/year) that applies regardless of solar. This is a network access fee charged by Aurora Energy."*

Daily solar cost framing: *"Going solar costs approximately **$X.XX/day** for X years — then your electricity is free."*

---

### 8.3 Savings Breakdown Chart
- Component: shadcn-svelte Donut or Bar Chart
- Shows: `savingsFromOffset` vs `savingsFromExport`
- Labels: "Energy you use directly" / "Energy you export to the grid"

**Conditional contextual copy — shown when `isHighExport === true`:**
> *"Because your home is mainly active in the mornings and evenings, a larger share of your solar generation is exported to the grid at 8.78c/kWh. Shifting some energy use to daylight hours — like running the dishwasher or washing machine during the day — or adding a battery can significantly increase your savings."*

This copy is a conversion opportunity, not a concern to suppress.

---

### 8.4 Payback Timeline
- Component: Horizontal progress bar, 0–15 year scale
- Payback year marked with label
- Fill: Brand gold to payback year, muted beyond
- Copy: *"Your system pays for itself in approximately X years, then generates free electricity for 25+ years."*

---

### 8.5 Year 1 vs Year 25 Bill Comparison Table

| | Year 1 | Year 25 |
|---|---|---|
| **Without Solar** | `$billYear1WithoutSolar` | `$billYear25WithoutSolar` |
| **With Solar** | `$billYear1WithSolar` | `$billYear25WithSolar` |

Note: *"Without-solar figures assume 3% annual electricity price increase. With-solar figures include panel degradation over time."*

---

### 8.6 25-Year Cumulative Savings Chart
- Component: shadcn-svelte Area Chart
- X-axis: Years 1–25 | Y-axis: Cumulative net savings ($)
- Starts negative (system cost at Year 0), rises to break-even, then continues positive
- Break-even year marked with vertical reference line
- Data: `yearProjections` array
- Note beneath chart: *"Projection applies 3% annual electricity price growth to grid savings and 0.5% annual panel degradation. Feed-in tariff held flat."*

---

### 8.7 Monthly Solar Production Chart
- Component: shadcn-svelte Bar Chart (12 bars, Jan–Dec)
- Data: `monthlyYieldKwh` array (seasonal + orientation multipliers applied)
- Copy: *"Tasmania's cooler winter means lower generation June–August — roughly half of summer output. Your panels still perform year-round, with summer generating the strongest returns."*

---

### 8.8 System Details Summary
Stat card grid:
- Recommended system: `X kW`
- Number of panels: `XX panels`
- Approximate roof area: `~XXm²`
- Annual generation: `X,XXX kWh`
- Daily average generation: `XX.X kWh`
- Daily average export: `X.X kWh`
- Self-consumption rate: `XX%`
- System cost (before rebate): `$XX,XXX`
- Federal STC rebate: `−$X,XXX`
- **Estimated cost range: `$XX,XXX – $XX,XXX`** (low to high, after rebate)
- Disclaimer beneath: *"Final pricing confirmed at your free site assessment and depends on your roof, preferred panels, and inverter."*

---

### 8.9 Battery Scenario (conditional — `batteryInterest === true`)
- Combined annual savings: `$combinedAnnualSavings/year`
- Additional savings from battery: `+$additionalAnnualSavings/year`
- Battery payback: `X years`
- Battery cost estimate: `$12,000`
- Copy: *"A battery stores energy you'd otherwise export at 8.78c/kWh, making it available for evening use at 25.35c/kWh — nearly 3× the value. Estimate assumes a 10kWh system with 90% round-trip efficiency."*

---

### 8.10 Environmental Impact
- Annual CO₂ offset: `X,XXX kg` (`X.X tonnes`)
- Trees equivalent: *"Like planting XX trees every year"*
- Cars off the road: *"Equivalent to taking X cars off the road for a year"*

---

### 8.11 Assumptions Disclosure (Legal Requirement)
Collapsible section, muted styling, always present and never hidden by default:

> *"These figures are estimates based on average Tasmanian conditions and are not a guarantee of financial return. Calculations assume: Aurora Energy Tariff 93 blended rate of 25.35c/kWh; feed-in tariff of 8.78c/kWh (2025–26 regulated minimum, held flat in projections as the trend is declining); regional solar yield of 1,150–1,220 kWh/kW/year adjusted for roof orientation; 3% annual electricity price increase applied to grid savings only; 0.5% annual panel degradation applied across 25-year projection; system cost range post-STC rebate (mid-point used for calculations). Battery scenario assumes 10kWh system at $12,000 installed with 90% round-trip efficiency. A fixed daily supply charge of ~$552/year cannot be offset by solar and is included in projected bills. Actual results will vary based on shading, roof pitch, household behaviour, and future tariff changes. Maximum Solar recommends a free in-home site assessment before making any investment decision."*

---

### 8.12 Call to Action
- **Primary CTA:** `"Book Your Free Site Assessment"` → `maximumsolar.com.au/contact`
- **Secondary:** Phone `1300 457 542`
- If `batteryMaybe`: *"You indicated interest in battery storage — our team will discuss options at your assessment."*
- If `hasEvPlanned`: *"Planning an EV? We'll size your system to accommodate EV charging."*
- If `isHighExport`: *"Your export ratio suggests a battery could significantly boost your savings — ask about this at your assessment."*

---

### 8.13 Email CTA (if user did not opt in at Step 7)
Subtle banner: *"Want a copy of these results?"* → email input + send button.

---

## 9. Lead Capture & Email Handling

### 9.1 Server Action — `+page.server.ts`

Receives all quiz inputs plus serialised `CalculationResult`. Dispatches two emails. Returns `{ success: true }` or `{ success: false, error }`.

### 9.2 Internal Notification Email

**To:** `info@maximumsolar.com.au`
**From:** `Solar Calculator <webmaster@quote.maximumsolar.com.au>`
**Subject:** `New Solar Lead — [First Name] [Last Name] — [Postcode]`

Body includes: contact details, postcode + region, exact bill + period, occupancy, household size, home size, **roof orientation** (new), appliances, EV owned/planned, battery interest, recommended system size, annual savings, payback period, timestamp.

### 9.3 User Results Email

**To:** User's submitted email
**From:** `Solar Calculator <webmaster@quote.maximumsolar.com.au>`
**Subject:** `Your Solar Savings Estimate — Maximum Solar`

Body includes: greeting, annual + lifetime savings, before/after quarterly bill, **supply charge note**, system recommendation + cost range, payback, battery scenario (if applicable), environmental impact, assumptions disclosure, CTA, footer.

### 9.4 Resend Configuration

```typescript
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
const resend = new Resend(RESEND_API_KEY);
```

---

## 10. File & Folder Structure

```
src/
├── lib/
│   ├── solar/
│   │   ├── constants.ts
│   │   ├── postcodes.ts
│   │   └── calculator.ts
│   ├── state/
│   │   └── quiz.svelte.ts
│   ├── components/
│   │   ├── calculator/
│   │   │   ├── ProgressBar.svelte
│   │   │   ├── StepWrapper.svelte
│   │   │   ├── steps/
│   │   │   │   ├── Step1Eligibility.svelte
│   │   │   │   ├── Step2Location.svelte
│   │   │   │   ├── Step3EnergyUsage.svelte
│   │   │   │   ├── Step4YourHome.svelte         ← Now contains 4 questions (incl. orientation)
│   │   │   │   ├── Step5AppliancesEV.svelte
│   │   │   │   ├── Step6BatteryInterest.svelte
│   │   │   │   └── Step7LeadCapture.svelte
│   │   │   ├── exits/
│   │   │   │   ├── RenterExit.svelte
│   │   │   │   ├── CommercialExit.svelte
│   │   │   │   ├── OutOfAreaExit.svelte
│   │   │   │   └── BelowThresholdExit.svelte
│   │   │   └── results/
│   │   │       ├── ResultsDashboard.svelte
│   │   │       ├── HeroSavings.svelte
│   │   │       ├── BeforeAfterBills.svelte
│   │   │       ├── SavingsBreakdownChart.svelte  ← Includes high-export contextual copy
│   │   │       ├── PaybackTimeline.svelte
│   │   │       ├── Year1vs25Table.svelte
│   │   │       ├── CumulativeSavingsChart.svelte
│   │   │       ├── MonthlyProductionChart.svelte
│   │   │       ├── SystemDetailsSummary.svelte   ← Cost shown as range, not single figure
│   │   │       ├── BatteryScenario.svelte
│   │   │       ├── EnvironmentalImpact.svelte
│   │   │       ├── AssumptionsDisclosure.svelte
│   │   │       └── ResultsCTA.svelte
│   └── emails/
│       ├── InternalLeadEmail.tsx
│       └── UserResultsEmail.tsx
└── routes/
    └── calculator/
        ├── +page.svelte
        └── +page.server.ts
```

---

## 11. Component Specifications

### Quiz State (`src/lib/state/quiz.svelte.ts`)

```typescript
export const quizState = $state({
  currentStep: 1,
  exitType: null as string | null,
  inputs: {
    ownershipType:        null as 'owner' | 'renter' | 'business' | null,
    postcode:             '',
    region:               'hobart',
    billAmount:           null as number | null,
    billPeriod:           'quarterly' as 'monthly' | 'quarterly' | 'annually',
    quarterlyBill:        null as number | null,
    occupancyProfile:     null as 'all_day' | 'morning_evening' | 'night_only' | null,
    householdSize:        null as '1_2' | '3_4' | '5_plus' | null,
    homeSize:             null as 'apartment' | 'medium' | 'large' | 'rural' | null,
    roofOrientation:      null as 'north' | 'north_east_west' | 'east_west' | 'south' | 'not_sure' | null,
    hasElectricHotWater:  false,
    hasDucatedHvac:       false,
    hasPool:              false,
    hasEvOwned:           false,
    hasEvPlanned:         false,
    batteryInterest:      false,
    batteryMaybe:         false,
    firstName:            '',
    lastName:             '',
    email:                '',
    phone:                '',
    emailOptIn:           false,
  },
});
```

### ProgressBar.svelte
- Props: `currentStep: number`, `totalSteps: number` (7)
- Hidden on exit screens.

### StepWrapper.svelte
- Props: `title: string`, `subtitle?: string`
- Back button decrements `quizState.currentStep`

### ResultsDashboard.svelte
- Receives `CalculationResult` as prop
- Renders when `resultsVisible === true` on parent page

---

## 12. Edge Cases & Error Handling

### Renter Exit
Trigger: Step 1 `I rent`. Email capture only. Tagged `renter_interest`.

### Commercial Exit
Trigger: Step 1 `I'm a business owner`. CTA to commercial page + optional contact form.

### Out-of-Area Postcode
Trigger: Non-Tasmanian postcode. Simple email capture.

### Below Viability Threshold
Trigger: `isViable === false` (bill under $300/quarter). No savings estimate shown. Lead captured and tagged `low_usage`.

### Form Submission Failure
Inline error shown. Results displayed regardless if calculation succeeded. Error logged server-side.

### Missing Inputs
All steps enforce completion. `calculate()` includes null guards with conservative defaults.

---

## 13. Legal & Compliance Requirements

### ASIC RG 170
- All figures qualified as estimates throughout
- No "guaranteed savings" language
- Full assumptions disclosure always present on results page (§8.11)
- Cost presented as a range to avoid creating misleading price anchors

### Australian Consumer Law (ACL)
- No "free" or "no cost" solar language
- Conservative constants used throughout (lower yield, lower SC, degradation applied)
- Fixed supply charge shown on results page — no claim that the bill reaches zero
- Environmental claims sourced and documented in `constants.ts`

### Privacy
- Privacy copy on Step 7 before submission
- User emails used solely for results delivery
- Working unsubscribe in all user emails (Resend footer)

---

## 14. Environment Variables

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Set in Vercel → Settings → Environment Variables. Accessed only via `$env/static/private`.

---

## 15. Deployment Notes

- Standard SvelteKit SSR + server action. `@sveltejs/adapter-vercel` only.
- Page at `maximumsolar.com.au/calculator`. No subdomain.
- All calculation is client-side. Only network request is lead form submission.
- Charts loaded only on results render.

### Analytics Events (when PostHog connected)
`calculator_started`, `calculator_step_completed` (with `step`), `calculator_exit` (with `exit_type`), `calculator_results_viewed`, `calculator_lead_submitted`, `calculator_email_optin`, `calculator_cta_clicked`, `calculator_battery_scenario_viewed`, `calculator_high_export_shown`

---

## 16. Phase 2 Considerations

| Feature | Notes |
|---|---|
| Solcast/PVWatts API | Replace region yield constants + orientation multiplier with API call keyed on postcode |
| Roof pitch as input | Currently not asked — pitch affects yield, especially in winter |
| Panel degradation curve | Currently linear 0.5%/year; real degradation is slightly steeper in early years |
| FiT decline modelling | Apply negative −1%/year to FiT in projections rather than holding flat |
| NEM12 upload | Replaces SC ratio with interval-derived figure |
| VPP modelling | Revenue from grid services |
| CRM integration | Add to server action alongside Resend |
| Aurora+ data pull | Direct API for real consumption data |
| Commercial calculator | Separate route, different tariffs and system sizes |
| Best/worst case range display | Show savings as a range to further strengthen ASIC RG 170 compliance |

---

## Appendix A — Bill Normalisation & Midpoints

| Input period | Normalisation |
|---|---|
| Monthly | × 3 |
| Quarterly | No change |
| Annually | ÷ 4 |

| Range chip | Midpoint (quarterly) |
|---|---|
| Under $300 | $200 |
| $300–$500 | $400 |
| $500–$700 | $600 |
| $700–$1,000 | $850 |
| Over $1,000 | $1,200 |
| Not sure | $500 |

---

## Appendix B — System Size Decision Table

| Quarterly Bill | Base Size | Nudge Conditions | Final Size |
|---|---|---|---|
| Under $300 | None | — | Not viable |
| $300–$500 | 6.6kW | 5+ people → 10kW; EV owned/planned → 10kW | 6.6–10kW |
| $500–$700 | 6.6kW | Same as above | 6.6–10kW |
| $700–$1,000 | 10kW | EV owned/planned → 13.2kW | 10–13.2kW |
| Over $1,000 | 13.2kW | Already at max | 13.2kW |

---

## Appendix C — Self-Consumption Reference

| Base (occupancy) | Modifiers (additive) | Practical range |
|---|---|---|
| All day: **0.45** | Home size: −0.05 to +0.08 | 0.40–0.76 |
| Mornings/evenings: 0.30 | Hot water: +0.05 | 0.25–0.56 |
| Night only: 0.15 | HVAC: +0.08 | 0.10–0.41 |
| | Pool: +0.05 | |
| EV NOT applied | — | — |

---

## Appendix D — Orientation Multipliers

| Orientation | Multiplier | Yield impact vs north |
|---|---|---|
| Mainly north | 1.00 | Baseline |
| North-east / North-west | 0.90 | −10% |
| East or west | 0.82 | −18% |
| Mainly south | 0.65 | −35% |
| Not sure | 0.88 | Conservative assumption |

---

## Appendix E — Seasonal Monthly Multipliers (Hobart)

| Month | Multiplier |
|---|---|
| January | 1.45 |
| February | 1.35 |
| March | 1.15 |
| April | 0.90 |
| May | 0.70 |
| June | 0.58 |
| July | 0.62 |
| August | 0.75 |
| September | 0.95 |
| October | 1.15 |
| November | 1.30 |
| December | 1.40 |

> Summer output is roughly 2.5× winter output in Hobart. The seasonal chart on the results page communicates this honestly rather than obscuring it.

---

## Appendix F — System Cost Ranges (Post-STC Rebate)

| System | Low | Mid (used in calcs) | High | STC Rebate |
|---|---|---|---|---|
| 6.6kW | $5,936 | $7,500 | $9,436 | $1,564 |
| 10kW | $8,500 | $11,000 | $13,500 | $2,000 |
| 13.2kW | $11,500 | $15,000 | $18,500 | $2,500 |

> Mid-point used for all payback and projection calculations. Low–High range shown on results page. Disclaimer directs users to the site assessment for a firm quote.

---

*Document maintained by Codec Digital. For questions contact the project lead.*
*Financial rate data: Aurora Energy, Tasmanian Economic Regulator, Clean Energy Council.*
*Version 3.0 — May 2026. Supersedes Version 2.0.*
