<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import type { QuizStateInputs } from '$lib/state/quiz.svelte';
	import HeroSavings from './HeroSavings.svelte';
	import BeforeAfterBills from './BeforeAfterBills.svelte';
	import SavingsBreakdownChart from './SavingsBreakdownChart.svelte';
	import PaybackTimeline from './PaybackTimeline.svelte';
	import Year1vs25Table from './Year1vs25Table.svelte';
	import CumulativeSavingsChart from './CumulativeSavingsChart.svelte';
	import MonthlyProductionChart from './MonthlyProductionChart.svelte';
	import SystemDetailsSummary from './SystemDetailsSummary.svelte';
	import BatteryScenario from './BatteryScenario.svelte';
	import EnvironmentalImpact from './EnvironmentalImpact.svelte';
	import AssumptionsDisclosure from './AssumptionsDisclosure.svelte';
	import ResultsCTA from './ResultsCTA.svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		result: CalculationResult;
		inputs: QuizStateInputs;
		basic?: boolean;
	}

	let { result, inputs, basic = false }: Props = $props();
</script>

<div in:fade={{ duration: 400 }} class="space-y-6">
	<HeroSavings {result} {inputs} />

	<BeforeAfterBills {result} />

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<SavingsBreakdownChart {result} />
		<PaybackTimeline {result} />
	</div>

	{#if !basic}
		<Year1vs25Table {result} />
	{/if}

	<CumulativeSavingsChart {result} />

	{#if !basic}
		<MonthlyProductionChart {result} />
	{/if}

	<EnvironmentalImpact {result} />

	<SystemDetailsSummary {result} />

	{#if result.batteryScenario}
		<BatteryScenario {result} />
	{/if}

	<ResultsCTA {result} {inputs} />

	<AssumptionsDisclosure />
</div>
