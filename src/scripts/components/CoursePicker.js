import React, { useContext, useEffect, useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { usePrices } from "../hooks/usePrices";
import { Context } from "../context/index";

const CourseItem = ({
	id,
	kurs_schulungs_gruppen_name: name,
	kurz_beschreibung: description,
	unit_shortcode,
	minBookableAmount,
}) => {
	const [checked, setChecked] = useState(false);
	const [amount, setAmount] = useState(1);
	const [quantity, setQuantity] = useState(minBookableAmount);

	const price = usePrices({ id, shouldFetch: checked, qty: quantity });
	const { addSelectedCourse, removeSelectedCourse, updateSelectedCourse } = useContext(Context);

	useEffect(() => {
		if (checked) {
			addSelectedCourse({ id, name, amount, quantity });
		} else {
			removeSelectedCourse(id);
		}
	}, [checked]);

	useEffect(() => {
		if (price) {
			updateSelectedCourse({ id, name, amount, quantity, price });
		}
	}, [price, amount]);

	return (
		<div className={checked ? "coursepicker__item checked" : "coursepicker__item"}>
			<div className="coursepicker__item--body">
				<div className="coursepicker__item--checkbox">
					<input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
				</div>
				<div className="coursepicker__item--description">
					<h4>
						<span>{name}</span>
						<span>{price ? (parseFloat(price.price) * amount).toFixed(2) + "€" : null}</span>
					</h4>
					<p>{description}</p>
				</div>
			</div>
			{checked ? (
				<div className="coursepicker__item--meta">
					<div className="coursepicker__item--meta-input">
						<label>Anzahl der Teilnehmer</label>
						<input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
					</div>
					<div className="coursepicker__item--meta-input">
						<label>Anzahl der {unit_shortcode === "h" ? "Kursstunden" : "Kurstage"}</label>
						<input
							type="number"
							min={minBookableAmount}
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
};

function CoursePicker({ querytype, query }) {
	const courses = useCourses({ shouldFetch: true, querytype, query });

	return (
		<div className="coursepicker">
			{courses && courses.length ? (
				<ul>
					{courses.map((course) => (
						<CourseItem key={course.id} {...course} />
					))}
				</ul>
			) : null}
		</div>
	);
}

export default CoursePicker;
