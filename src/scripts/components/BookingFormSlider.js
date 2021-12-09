import React from "react";
import { useContainerSize } from "../hooks/useContainerSize";

function BookingFormSlider({ children }) {
	const { width } = useContainerSize();

	return <div className="bookingform__slider">{children}</div>;
}

export default BookingFormSlider;
