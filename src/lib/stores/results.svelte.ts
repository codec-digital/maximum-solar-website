import type { CalculationResult } from '$lib/solar/calculator';

function createResultsStore() {
	let result = $state<CalculationResult | null>(null);

	return {
		get result() {
			return result;
		},

		set(data: CalculationResult) {
			result = data;
		},

		clear() {
			result = null;
		}
	};
}

export const resultsStore = createResultsStore();
