import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useAppState = () => {
	const [loading, setLoading] = useState(true);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentState, setCurrentState] = useState({});
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);
	const [globalSettings, setGlobalSettings] = useState({});

	useEffect(() => {
		(async () => {
			const response = await fetchDataAsync({ action: "/config", data: null });
			setGlobalSettings(response);
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		const state = [
			{
				index: 1,
				title: "Reisezeitraum",
				description:
					"Um dir die bestmöglich Windausbeute garantieren zu können, benötigen wir noch deinen Urlaubszeitraum.",
			},
			{
				index: 2,
				title: "Kursauswahl",
				description: "Welchen Kurs möchtest du buchen?",
			},
			{
				index: 3,
				title: "Teilnehmer",
				description: "Füge deiner Kursauswahl Teilnehmer hinzu.",
			},
			{
				index: 4,
				title: "Rechnungsdetails",
				description: "Trage hier die Angaben des Rechnungsempfängers ein.",
			},
			{
				index: 5,
				title: "Zusammenfassung",
				description: "Überprüfe deine Daten, bevor du deine Buchung absendest",
			},
		];

		setCurrentState(state[currentIndex]);
	}, [currentIndex]);

	return {
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
	};
};
