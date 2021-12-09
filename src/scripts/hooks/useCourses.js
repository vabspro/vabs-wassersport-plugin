import { useState, useEffect } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useCourses = ({ shouldFetch, querytype, query }) => {
	const [courses, setCourses] = useState([]);

	const fetchAllCourses = async () => {
		const response = await fetchDataAsync({ action: "/get_courses", data: null });
		setCourses(
			response.sort((a, b) => {
				if (a.online_pos < b.online_pos) {
					return -1;
				}
				if (a.online_pos > b.online_pos) {
					return 1;
				}
				return 0;
			})
		);
	};

	const fetchAllCoursesByGroupId = async () => {
		const response = await fetchDataAsync({ action: `/get_courses_of_group/?id=${query}`, data: null });
		setCourses(
			response.sort((a, b) => {
				if (a.online_pos < b.online_pos) {
					return -1;
				}
				if (a.online_pos > b.online_pos) {
					return 1;
				}
				return 0;
			})
		);
	};

	const fetchAllCoursesById = async () => {
		const response = await fetchDataAsync({ action: `/get_courses?ids=${query}`, data: null });
		setCourses(
			response.sort((a, b) => {
				if (a.online_pos < b.online_pos) {
					return -1;
				}
				if (a.online_pos > b.online_pos) {
					return 1;
				}
				return 0;
			})
		);
	};

	useEffect(() => {
		if (shouldFetch && !courses.length) {
			switch (querytype) {
				case "courses":
					fetchAllCoursesById();
					break;

				case "coursegroup":
					fetchAllCoursesByGroupId();
					break;

				default:
					fetchAllCourses();
					break;
			}
		}
	}, [shouldFetch]);

	return courses;
};
