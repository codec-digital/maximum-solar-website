<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import ProgressBar from '$lib/components/calculator/ProgressBar.svelte';
	import Step1Eligibility from '$lib/components/calculator/steps/Step1Eligibility.svelte';
	import Step2Location from '$lib/components/calculator/steps/Step2Location.svelte';
	import Step3EnergyUsage from '$lib/components/calculator/steps/Step3EnergyUsage.svelte';
	import Step4YourHome from '$lib/components/calculator/steps/Step4YourHome.svelte';
	import Step5AppliancesEV from '$lib/components/calculator/steps/Step5AppliancesEV.svelte';
	import Step6BatteryInterest from '$lib/components/calculator/steps/Step6BatteryInterest.svelte';
	import Step7LeadCapture from '$lib/components/calculator/steps/Step7LeadCapture.svelte';
	import RenterExit from '$lib/components/calculator/exits/RenterExit.svelte';
	import CommercialExit from '$lib/components/calculator/exits/CommercialExit.svelte';
	import OutOfAreaExit from '$lib/components/calculator/exits/OutOfAreaExit.svelte';
	import BelowThresholdExit from '$lib/components/calculator/exits/BelowThresholdExit.svelte';
	import ResultsDashboard from '$lib/components/calculator/results/ResultsDashboard.svelte';
	import { quizState } from '$lib/state/quiz.svelte';
	import { resultsStore } from '$lib/state/results.svelte';
	import { calculate } from '$lib/solar/calculator';

	let resultsVisible = $state(false);
	let basicMode = $state(false);
	let submitting = $state(false);
	let submitError = $state('');

	// Scroll to the calculator card on step transitions, but not on initial page load.
	let stepInitialized = false;
	$effect(() => {
		quizState.currentStep; // reactive dependency
		if (stepInitialized) {
			document.getElementById('calculator-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
		stepInitialized = true;
	});

	const TOTAL_STEPS = 7;

	const showProgress = $derived(!quizState.exitType && !resultsVisible);

	function runCalculation() {
		const inp = quizState.inputs;
		return calculate({
			postcode: inp.postcode,
			region: inp.region,
			quarterlyBill: inp.quarterlyBill ?? 500,
			occupancyProfile: inp.occupancyProfile ?? 'morning_evening',
			householdSize: inp.householdSize ?? '3_4',
			homeSize: inp.homeSize ?? 'medium',
			roofOrientation: inp.roofOrientation ?? 'not_sure',
			hasElectricHotWater: inp.hasElectricHotWater,
			hasDucatedHvac: inp.hasDucatedHvac,
			hasPool: inp.hasPool,
			hasEvOwned: inp.hasEvOwned,
			hasEvPlanned: inp.hasEvPlanned,
			batteryInterest: inp.batteryInterest
		});
	}

	function handleBasicReport() {
		const result = runCalculation();
		resultsStore.set(result);
		if (!result.isViable) {
			quizState.exitType = 'below_threshold';
			return;
		}
		basicMode = true;
		resultsVisible = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function handleLeadSubmit(contactData: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	}) {
		submitting = true;
		submitError = '';

		const result = runCalculation();

		if (!result.isViable) {
			resultsStore.set(result);
			quizState.exitType = 'below_threshold';
			submitting = false;
			try {
				await fetch('?/submitLead', { method: 'POST', body: buildFormData(contactData, result) });
			} catch {
				// Non-blocking
			}
			return;
		}

		resultsStore.set(result);

		try {
			const response = await fetch('?/submitLead', {
				method: 'POST',
				body: buildFormData(contactData, result)
			});
			if (!response.ok) {
				submitError = 'Something went wrong sending your results. Please call us on 1300 457 542.';
			}
		} catch {
			submitError = 'Something went wrong sending your results. Please call us on 1300 457 542.';
		} finally {
			submitting = false;
		}

		basicMode = false;
		resultsVisible = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function buildFormData(
		contactData: { firstName: string; lastName: string; email: string; phone: string },
		result: ReturnType<typeof calculate>
	) {
		const inp = quizState.inputs;
		const fd = new FormData();
		fd.append('firstName', contactData.firstName);
		fd.append('lastName', contactData.lastName);
		fd.append('email', contactData.email);
		fd.append('phone', contactData.phone);
		fd.append('postcode', inp.postcode);
		fd.append('region', inp.region);
		fd.append('billAmount', String(inp.billAmount ?? ''));
		fd.append('billPeriod', inp.billPeriod);
		fd.append('quarterlyBill', String(inp.quarterlyBill ?? ''));
		fd.append('occupancyProfile', inp.occupancyProfile ?? 'morning_evening');
		fd.append('householdSize', inp.householdSize ?? '3_4');
		fd.append('homeSize', inp.homeSize ?? 'medium');
		fd.append('roofOrientation', inp.roofOrientation ?? 'not_sure');
		fd.append('hasElectricHotWater', String(inp.hasElectricHotWater));
		fd.append('hasDucatedHvac', String(inp.hasDucatedHvac));
		fd.append('hasPool', String(inp.hasPool));
		fd.append('hasEvOwned', String(inp.hasEvOwned));
		fd.append('hasEvPlanned', String(inp.hasEvPlanned));
		fd.append('batteryInterest', String(inp.batteryInterest));
		fd.append('batteryMaybe', String(inp.batteryMaybe));
		fd.append('systemSizeKw', String(result.systemSizeKw));
		fd.append('annualSavings', String(result.annualSavings));
		fd.append('lifetimeSavings', String(result.lifetimeSavings));
		fd.append('annualYieldKwh', String(result.annualYieldKwh));
		fd.append('simplePaybackYears', String(result.simplePaybackYears));
		fd.append('newQuarterlyBill', String(result.newQuarterlyBill));
		fd.append('annualCO2OffsetKg', String(result.annualCO2OffsetKg));
		fd.append('treesEquivalent', String(result.treesEquivalent));
		fd.append('isViable', String(result.isViable));
		return fd;
	}
</script>

<Seo
	title="Solar Savings Calculator | Maximum Solar"
	description="Find out how much you could save with solar in Tasmania. Get a personalised estimate based on your home's energy usage — free, instant, no obligation."
/>

<main class="min-h-screen bg-black py-16">
	<div
		class="mx-auto px-4 sm:px-6 {resultsVisible
			? 'max-w-7xl'
			: 'max-w-2xl'} transition-all duration-500"
	>
		<!-- Brand header -->
		<div class="mb-10 pt-24 text-center lg:pt-48">
			<h1 class="font-heading mt-3 text-3xl font-bold text-white md:text-6xl">
				Solar Savings Calculator
			</h1>
			<p class="mt-2 text-zinc-400">
				Get a personalised estimate for your Tasmanian home. Free, instant, no obligation.
			</p>
		</div>

		<!-- Main card -->
		<div id="calculator-card" class="rounded-2xl bg-zinc-900 p-6 ring-1 ring-white/10 sm:p-8">
			{#if resultsVisible && resultsStore.result}
				<ResultsDashboard
					result={resultsStore.result}
					inputs={quizState.inputs}
					basic={basicMode}
				/>
			{:else if quizState.exitType === 'renter'}
				<RenterExit />
			{:else if quizState.exitType === 'commercial'}
				<CommercialExit />
			{:else if quizState.exitType === 'out_of_area'}
				<OutOfAreaExit />
			{:else if quizState.exitType === 'below_threshold' && resultsStore.result}
				<BelowThresholdExit result={resultsStore.result} />
			{:else}
				{#if showProgress}
					<ProgressBar currentStep={quizState.currentStep} totalSteps={TOTAL_STEPS} />
				{/if}

				{#if quizState.currentStep === 1}
					<Step1Eligibility />
				{:else if quizState.currentStep === 2}
					<Step2Location />
				{:else if quizState.currentStep === 3}
					<Step3EnergyUsage />
				{:else if quizState.currentStep === 4}
					<Step4YourHome />
				{:else if quizState.currentStep === 5}
					<Step5AppliancesEV />
				{:else if quizState.currentStep === 6}
					<Step6BatteryInterest />
				{:else if quizState.currentStep === 7}
					<Step7LeadCapture
						onSubmit={handleLeadSubmit}
						onBasicReport={handleBasicReport}
						{submitting}
						{submitError}
					/>
				{/if}
			{/if}
		</div>

		<!-- Footer disclaimer -->
		{#if !resultsVisible && !quizState.exitType}
			<p class="mt-6 text-center text-xs text-zinc-600">
				All figures are estimates only. Tasmanian-specific data. Calculations run locally — your
				information is never shared until you choose to submit.
			</p>
		{/if}
	</div>
</main>
