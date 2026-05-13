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
