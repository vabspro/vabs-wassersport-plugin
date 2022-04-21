import React, { createContext, useState } from "react";
import { useAppState } from "../hooks/useAppState";
import { useContact } from "../hooks/useContact";
import { useVoucher } from "../hooks/useVoucher";
import { useSelectedCourses } from "../hooks/useSelectedCourses";
import { useRange } from "../hooks/useRange";
import { useParticipants } from "../hooks/useParticipants";
import { useInterests } from "../hooks/useInterests";

export const Context = createContext();

export const ContextProvider = ({ children, form: type }) => {
	const {
		loading,
		setLoading,
		errors,
		setErrors,
		globalSettings,
		success,
		setSuccess,
		currentState,
		currentIndex,
		setCurrentIndex,
	} = useAppState();

	const contact = useContact();
	const interests = useInterests();
	const { startDate, endDate, setStartDate, setEndDate, currentYear, setCurrentYear } = useRange();
	const { selectedCourses, addSelectedCourse, removeSelectedCourse, updateSelectedCourse } = useSelectedCourses();

	const { participants, updateParticipant } = useParticipants({ selectedCourses });

	const { list, templates, voucher, setVoucher, recipient, setRecipient } = useVoucher({
		shouldFetch: type === "voucher",
		callback: () => setLoading(false),
	});

	return (
		<Context.Provider
			value={{
				loading,
				setLoading,
				success,
				setSuccess,
				globalSettings,
				errors,
				setErrors,
				contact,
				interests,
				list,
				templates,
				voucher,
				setVoucher,
				recipient,
				setRecipient,
				type,
				selectedCourses,
				addSelectedCourse,
				removeSelectedCourse,
				updateSelectedCourse,
				startDate,
				endDate,
				setStartDate,
				setEndDate,
				currentYear,
				setCurrentYear,
				participants,
				updateParticipant,
				currentState,
				setCurrentIndex,
				currentIndex,
			}}
		>
			{children}
		</Context.Provider>
	);
};
