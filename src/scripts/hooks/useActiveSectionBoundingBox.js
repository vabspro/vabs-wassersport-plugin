import { useEffect, useState } from "react";

export const useActiveSectionBoundingBox = (index) => {
	const [size, setSize] = useState({});

	useEffect(() => {
		const activeSection = document.querySelector(".bookingform__section.current");
		if (activeSection) {
			const boundingBox = activeSection.getBoundingClientRect();
			setSize(boundingBox);
		}
	}, [index]);

	return size;
};
