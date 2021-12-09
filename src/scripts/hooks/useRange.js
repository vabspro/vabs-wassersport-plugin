import { useState } from "react";
import moment from "moment";

export const useRange = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const [currentYear, setCurrentYear] = useState(moment().year());

	return {
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		currentYear,
		setCurrentYear,
	};
};
