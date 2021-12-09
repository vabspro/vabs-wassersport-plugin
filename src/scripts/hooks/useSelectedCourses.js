import { useState } from "react";

export const useSelectedCourses = () => {
	const [selectedCourses, setSelectedCourses] = useState([]);

	const addSelectedCourse = (course) => {
		setSelectedCourses([...selectedCourses, course]);
	};
	const removeSelectedCourse = (id) => {
		setSelectedCourses([...selectedCourses.filter((course) => course.id !== id)]);
	};
	const updateSelectedCourse = (course) => {
		setSelectedCourses(
			selectedCourses.map((c) => {
				if (c.id === course.id) {
					return course;
				} else {
					return c;
				}
			})
		);
	};

	return { selectedCourses, addSelectedCourse, removeSelectedCourse, updateSelectedCourse };
};
