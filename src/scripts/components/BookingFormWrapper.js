import React, { useContext } from "react";
import { useActiveSectionBoundingBox } from "../hooks/useActiveSectionBoundingBox";
import { Context } from "../context/index";
import { useContainerSize } from "../hooks/useContainerSize";

function BookingFormWrapper({ children }) {
	return <div className="bookingform__wrapper">{children}</div>;
}

export default BookingFormWrapper;
