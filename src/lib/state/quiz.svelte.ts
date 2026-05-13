export interface QuizStateInputs {
	ownershipType: 'owner' | 'renter' | 'business' | null;
	postcode: string;
	region: string;
	billAmount: number | null;
	billPeriod: 'monthly' | 'quarterly' | 'annually';
	quarterlyBill: number | null;
	occupancyProfile: 'all_day' | 'morning_evening' | 'night_only' | null;
	householdSize: '1_2' | '3_4' | '5_plus' | null;
	homeSize: 'apartment' | 'medium' | 'large' | 'rural' | null;
	roofOrientation: 'north' | 'north_east_west' | 'east_west' | 'south' | 'not_sure' | null;
	hasElectricHotWater: boolean;
	hasDucatedHvac: boolean;
	hasPool: boolean;
	hasEvOwned: boolean;
	hasEvPlanned: boolean;
	batteryInterest: boolean;
	batteryMaybe: boolean;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	emailOptIn: boolean;
}

export const quizState = $state({
	currentStep: 1,
	exitType: null as string | null,
	inputs: {
		ownershipType: null as 'owner' | 'renter' | 'business' | null,
		postcode: '',
		region: 'hobart',
		billAmount: null as number | null,
		billPeriod: 'monthly' as 'monthly' | 'quarterly' | 'annually',
		quarterlyBill: null as number | null,
		occupancyProfile: null as 'all_day' | 'morning_evening' | 'night_only' | null,
		householdSize: null as '1_2' | '3_4' | '5_plus' | null,
		homeSize: null as 'apartment' | 'medium' | 'large' | 'rural' | null,
		roofOrientation: null as 'north' | 'north_east_west' | 'east_west' | 'south' | 'not_sure' | null,
		hasElectricHotWater: false,
		hasDucatedHvac: false,
		hasPool: false,
		hasEvOwned: false,
		hasEvPlanned: false,
		batteryInterest: false,
		batteryMaybe: false,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		emailOptIn: false
	}
});
