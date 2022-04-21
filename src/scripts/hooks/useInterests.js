import { useState, useEffect } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useInterests = () => {
	const [interests, setInterests] = useState([]);

	const fetchAllInterests = async () => {
		const response = await fetchDataAsync({ action: "/client_interests", data: null });
		setInterests(response);
	};

	useEffect(() => {
		if (!interests.length) {
			fetchAllInterests();
		}
	}, []);

	return interests;
};
