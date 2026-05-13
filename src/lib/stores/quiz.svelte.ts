import { getRegionFromPostcode } from '$lib/solar/postcodes';

export type OwnershipType = 'owner' | 'renter' | 'business' | null;
export type OccupancyProfile = 'all_day' | 'morning_evening' | 'night_only' | null;
export type ExitType = 'renter' | 'commercial' | 'out_of_area' | 'below_threshold' | null;

export interface QuizInputs {
	ownershipType: OwnershipType;
	postcode: string;
	region: string;
	quarterlyBillLabel: string;
	quarterlyBillMidpoint: number;
	occupancyProfile: OccupancyProfile;
	batteryInterest: boolean;
	evInterest: boolean;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	emailOptIn: boolean;
}

interface QuizState {
	currentStep: number;
	exitType: ExitType;
	inputs: QuizInputs;
}

function createQuizStore() {
	let state = $state<QuizState>({
		currentStep: 1,
		exitType: null,
		inputs: {
			ownershipType: null,
			postcode: '',
			region: '',
			quarterlyBillLabel: '',
			quarterlyBillMidpoint: 0,
			occupancyProfile: null,
			batteryInterest: false,
			evInterest: false,
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			emailOptIn: false
		}
	});

	return {
		get currentStep() {
			return state.currentStep;
		},
		get exitType() {
			return state.exitType;
		},
		get inputs() {
			return state.inputs;
		},

		nextStep() {
			state.currentStep += 1;
		},

		previousStep() {
			if (state.currentStep > 1) {
				state.currentStep -= 1;
			}
		},

		setExit(type: ExitType) {
			state.exitType = type;
		},

		setOwnership(type: OwnershipType) {
			state.inputs.ownershipType = type;
		},

		setPostcode(postcode: string) {
			state.inputs.postcode = postcode;
			state.inputs.region = getRegionFromPostcode(postcode);
		},

		setBillRange(label: string, midpoint: number) {
			state.inputs.quarterlyBillLabel = label;
			state.inputs.quarterlyBillMidpoint = midpoint;
		},

		setOccupancy(profile: OccupancyProfile) {
			state.inputs.occupancyProfile = profile;
		},

		setFuturePlans(battery: boolean, ev: boolean) {
			state.inputs.batteryInterest = battery;
			state.inputs.evInterest = ev;
		},

		setContactDetails(details: {
			firstName: string;
			lastName: string;
			email: string;
			phone: string;
			emailOptIn: boolean;
		}) {
			Object.assign(state.inputs, details);
		},

		reset() {
			state.currentStep = 1;
			state.exitType = null;
			state.inputs = {
				ownershipType: null,
				postcode: '',
				region: '',
				quarterlyBillLabel: '',
				quarterlyBillMidpoint: 0,
				occupancyProfile: null,
				batteryInterest: false,
				evInterest: false,
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				emailOptIn: false
			};
		}
	};
}

export const quizStore = createQuizStore();
