export const getDateRange = (date: string) => {
	switch (date) {
		case "today": {
			const today = new Date().toISOString().split("T")[0];
			return {
				startDate: `${today}T00:00:00Z`,
				endDate: `${today}T23:59:59Z`,
			};
		}
		case "weekend": {
			const today = new Date();
			const saturday = new Date(today);
			saturday.setDate(today.getDate() + (6 - today.getDay()));
			const sunday = new Date(saturday);
			sunday.setDate(saturday.getDate() + 1);
			const startDate = saturday.toISOString().split("T")[0];
			const endDate = sunday.toISOString().split("T")[0];
			return {
				startDate: `${startDate}T00:00:00Z`,
				endDate: `${endDate}T23:59:59Z`,
			};
		}
		case "next-week": {
			const currentDate = new Date();
			const nextWeekStart = new Date(currentDate);
			nextWeekStart.setDate(
				currentDate.getDate() + (7 - currentDate.getDay())
			);
			const nextWeekEnd = new Date(nextWeekStart);
			nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
			const startDate = nextWeekStart.toISOString().split("T")[0];
			const endDate = nextWeekEnd.toISOString().split("T")[0];
			return {
				startDate: `${startDate}T00:00:00Z`,
				endDate: `${endDate}T23:59:59Z`,
			};
		}
		case "next-month": {
			const now = new Date();
			const nextMonth = new Date(
				now.getFullYear(),
				now.getMonth() + 1,
				1
			);
			const nextMonthEnd = new Date(
				now.getFullYear(),
				now.getMonth() + 2,
				0
			);
			const startDate = nextMonth.toISOString().split("T")[0];
			const endDate = nextMonthEnd.toISOString().split("T")[0];
			return {
				startDate: `${startDate}T00:00:00Z`,
				endDate: `${endDate}T23:59:59Z`,
			};
		}
		default:
			return {
				startDate: "",
				endDate: "",
			};
	}
};
