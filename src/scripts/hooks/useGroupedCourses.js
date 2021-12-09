import { useEffect, useState } from "react";
import { groupBy } from "../utils/groupBy";

export const useGroupedCourses = ({ items, key }) => {
	const [grouped, setGrouped] = useState({});

	useEffect(() => {
		if (items?.length && key) {
			setGrouped(groupBy(items, key));
		}
	}, [items, key]);

	return grouped;
};
