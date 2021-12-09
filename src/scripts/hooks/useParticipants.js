import { useEffect, useState } from "react";
import { uid } from "../utils/uid";

export const useParticipants = ({ selectedCourses }) => {
	const [participants, setParticipants] = useState([]);

	const updateParticipant = (person) => {
		setParticipants([
			...participants.map((participant) => {
				if (participant.id === person.id) {
					return person;
				} else {
					return participant;
				}
			}),
		]);
	};

	useEffect(() => {
		if (selectedCourses.length) {
			const response = [];

			selectedCourses.forEach((course) => {
				let counter = 0;
				while (counter < parseInt(course.amount)) {
					response.push({
						id: uid(),
						firstName: "",
						lastName: "",
						email: "",
						mobile: "",
						yearOfBirth: "",
						course: course.name,
					});

					counter++;
				}
			});

			setParticipants(response);
		}
	}, [selectedCourses]);

	return { participants, updateParticipant };
};
