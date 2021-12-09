import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const usePrices = ({ id = null, qty, shouldFetch }) => {
	const [prices, setPrices] = useState({});

	useEffect(() => {
		if (shouldFetch) {
			(async () => {
				const response = await fetchDataAsync({ action: `/get_course_price?id=${id}&qty=${qty}`, data: null });
				const priceObject = {};
				priceObject[id] = response;
				setPrices(priceObject);
			})();
		}
	}, [id, qty, shouldFetch]);

	return id ? prices[id] : prices;
};
