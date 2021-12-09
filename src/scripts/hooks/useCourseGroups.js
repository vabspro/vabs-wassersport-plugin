import { useState, useEffect } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useCourseGroups = ({ shouldFetch }) => {
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		if (shouldFetch && !groups.length) {
			(async () => {
				const response = await fetchDataAsync({ action: "/get_coursegroups", data: null });
				setGroups(response);
			})();
		}
	}, [shouldFetch]);
	return groups;
};
