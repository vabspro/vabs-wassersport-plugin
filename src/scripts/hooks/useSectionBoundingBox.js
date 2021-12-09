import { useState, useEffect } from "react";

export const useSectionBoundingBox = (ref) => {
	const [size, setSize] = useState({});

	const claculateSize = () => {
		const boundingBox = ref.current.getBoundingClientRect();
		console.log(boundingBox);
		setSize(boundingBox);
	};

	useEffect(() => {
		window.addEventListener("resize", () => claculateSize());
		if (ref.current) {
			claculateSize();
		}

		return window.removeEventListener("resize", claculateSize);
	}, [ref]);

	return size;
};
