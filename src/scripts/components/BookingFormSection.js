import React from "react";
import { useContainerSize } from "../hooks/useContainerSize";

export const BookingFormSection = ({ children, inView }) => {
	const { width } = useContainerSize();

	return <div className="bookingform__section">{children}</div>;
};
