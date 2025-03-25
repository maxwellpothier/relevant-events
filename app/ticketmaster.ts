import axios from "axios";
import {TicketMasterEvent, RawTicketmasterEvent, FormValues} from "../types";
import {getDateRange} from "@/utils/dateUtils";

const translateEvents = (
	events: RawTicketmasterEvent[]
): TicketMasterEvent[] => {
	return events.map(userEvent => {
		return {
			name: userEvent?.name || "Unknown Event",
			date: userEvent?.dates?.start?.localDate || "TBD",
			time: userEvent?.dates?.start?.localTime
				? new Date(
						`1970-01-01T${userEvent.dates.start.localTime}Z`
				  ).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
				  })
				: "TBD",
			location: `${
				userEvent?._embedded?.venues?.[0]?.city?.name || "Unknown City"
			}, ${
				userEvent?._embedded?.venues?.[0]?.state?.stateCode ||
				"Unknown State"
			}`,
			venue: userEvent?._embedded?.venues?.[0]?.name || "Unknown Venue",
			priceMin: userEvent?.priceRanges?.[0]?.min || 0,
			priceMax: userEvent?.priceRanges?.[0]?.max || 0,
			imageUrl: userEvent?.images?.[0]?.url || "",
			ticketUrl: userEvent?.url || "",
		};
	});
};

export const getEvents = async (
	formData: FormValues
): Promise<TicketMasterEvent[]> => {
	const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
	const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;

	const {startDate, endDate} = getDateRange(formData.date);

	const params = {
		apikey: apiKey,
		classificationName: formData.type,
		stateCode: formData.location,
		startDateTime: startDate,
		endDateTime: endDate,
	};
	try {
		const response = await axios.get(baseUrl, {params});
		if (!response.data._embedded) {
			throw new Error("No events found");
		}
		return translateEvents(response.data._embedded.events);
	} catch (e) {
		throw e;
	}
};
