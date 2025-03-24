export interface SelectOption {
	value: string;
	label: string;
}

export interface Question {
	id: string;
	text: string;
	options?: SelectOption[];
}

export interface FormValues {
	[key: string]: string;
}

export interface TicketMasterEvent {
	name: string;
	date: string;
	time: string;
	location: string;
	venue: string;
	priceMin: number;
	priceMax: number;
	imageUrl: string;
	ticketUrl: string;
}

export interface RawTicketmasterEvent {
	name?: string;
	dates?: {
		start?: {
			localDate?: string;
			localTime?: string;
		};
	};
	_embedded?: {
		venues?: Array<{
			name?: string;
			city?: {
				name?: string;
			};
			state?: {
				stateCode?: string;
			};
		}>;
	};
	priceRanges?: Array<{
		min?: number;
		max?: number;
	}>;
	images?: Array<{
		url?: string;
	}>;
	url?: string;
}
