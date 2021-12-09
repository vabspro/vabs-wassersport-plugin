import React, { useContext } from "react";
import { Context } from "../context/index";

export const BookingFormHeader = ({ title, description }) => {
	return (
		<div className="bookingform__header">
			<h3>{title}</h3>
			{description ? <p>{description}</p> : null}
		</div>
	);
};
