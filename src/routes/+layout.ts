import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const load = async () => {
	if (browser) {
		posthog.init('phc_E7BaNA2fN5gk8Qzg7uq4V1UgN3z34MVf6WPovKuq5Dk', {
			api_host: 'https://us.i.posthog.com',
			defaults: '2025-05-24'
		});
	}

	return;
};

export const prerender = true;
