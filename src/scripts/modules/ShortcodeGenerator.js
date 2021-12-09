import React, { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { useGroupedCourses } from "../hooks/useGroupedCourses";

function ShortcodeGenerator() {
	const [shortcode, setShortcode] = useState("");
	const [type, setType] = useState("");
	const [queryType, setQueryType] = useState("");
	const [agbLink, setAgbLink] = useState("");
	const [dsgvoLink, setDsgvoLink] = useState("");
	const [redirectLink, setRedirectLinkt] = useState("");

	const [selectedCourses, setSelectedCourses] = useState([]);
	const [selectedCourseGroup, setSelectedCourseGroup] = useState(null);

	const generateShortcode = () => {
		setShortcode(
			`[vabs_booking form="${type}" type="${queryType}" query="${
				selectedCourses.length ? selectedCourses.join() : selectedCourseGroup
			}" agb="${agbLink}" datenschutz="${dsgvoLink}" redirect="${redirectLink}"]`
		);
	};

	const courses = useCourses({ shouldFetch: type === "booking" });
	const grouped = useGroupedCourses({ items: courses, key: "kurs_gruppen_name" });

	return (
		<div className="shortcodegenerator">
			<h2>Shortcode generieren</h2>

			<div className="shortcodegenerator__form">
				<div className="shortcodegenerator__form--row" style={{ marginTop: "1rem" }}>
					<strong>Welche Art von Formular soll generiert werden?</strong>
					<div className="shortcodegenerator__form--field" style={{ marginTop: ".4rem", display: "block" }}>
						<label style={{ marginRight: "1.6rem" }}>
							<input
								type="radio"
								name="type"
								onChange={() => {
									setType("booking");
									setShortcode("");
									setQueryType("");

									setSelectedCourses([]);
									setSelectedCourseGroup(null);
								}}
							/>
							Buchungsformular
						</label>

						<label style={{ marginRight: "1.6rem" }}>
							<input
								type="radio"
								name="type"
								onChange={() => {
									setType("voucher");
									setShortcode("");
									setQueryType("");

									setSelectedCourses([]);
									setSelectedCourseGroup(null);
								}}
							/>
							Gutscheinformular
						</label>

						<label>
							<input
								type="radio"
								name="type"
								onChange={() => {
									setType("contact");
									setShortcode("");
									setQueryType("");

									setSelectedCourses([]);
									setSelectedCourseGroup(null);
								}}
							/>
							Kontaktformular
						</label>
					</div>
				</div>

				{type && type === "booking" ? (
					<div className="shortcodegenerator__form--row" style={{ marginTop: "1rem" }}>
						<strong>Welche Art von Formular soll generiert werden?</strong>
						<div
							className="shortcodegenerator__form--field"
							style={{ marginTop: ".4rem", display: "block" }}
						>
							<label style={{ marginRight: "1.6rem" }}>
								<input
									type="radio"
									name="queryType"
									onChange={() => {
										setQueryType("courses");
										setShortcode("");
										setSelectedCourses([]);
										setSelectedCourseGroup(null);
									}}
								/>
								individuelle Kurse
							</label>

							<label style={{ marginRight: "1.6rem" }}>
								<input
									type="radio"
									name="queryType"
									onChange={() => {
										setQueryType("coursegroup");
										setShortcode("");
										setSelectedCourses([]);
										setSelectedCourseGroup(null);
									}}
								/>
								Kurse einer Interessengruppe
							</label>
						</div>
					</div>
				) : null}
				{queryType === "courses" && courses.length ? (
					<div className="shortcodegenerator__form--row" style={{ marginTop: "1rem" }}>
						<strong>Auswahl der verfügbaren Kurse.</strong>
						<div className="shortcodegenerator__form--grid" style={{ marginTop: ".4rem" }}>
							{Object.keys(grouped)
								.sort()
								.map((key) => (
									<div className="column" key={key}>
										<strong>{key}</strong>
										<ul>
											{grouped[key]
												.sort((a, b) => {
													if (a.online_pos < b.online_pos) {
														return -1;
													}
													if (a.online_pos > b.online_pos) {
														return 1;
													}
													return 0;
												})
												.map((course) => (
													<li key={course.id}>
														<label>
															<input
																type="checkbox"
																name="courses[]"
																onChange={(e) => {
																	if (e.target.checked) {
																		setSelectedCourses([
																			...selectedCourses,
																			course.id,
																		]);
																	} else {
																		setSelectedCourses([
																			...selectedCourses.filter(
																				(c) => c !== course.id
																			),
																		]);
																	}
																}}
															/>
															{course.name}
														</label>
													</li>
												))}
										</ul>
									</div>
								))}
						</div>
					</div>
				) : queryType === "coursegroup" && courses.length ? (
					<div className="shortcodegenerator__form--row" style={{ marginTop: "1rem" }}>
						<strong>Auswahl der verfügbaren Kursgruppen.</strong>
						<div
							className="shortcodegenerator__form--grid"
							style={{ marginTop: ".4rem", display: "block" }}
						>
							{Object.keys(grouped)
								.sort()
								.map((key) => (
									<label key={key} style={{ marginRight: "1.6rem" }}>
										<input
											type="radio"
											name="coursegroup"
											onChange={(e) => {
												if (e.target.checked) {
													setSelectedCourseGroup(grouped[key][0].gruppen_id);
												}
											}}
										/>
										{key}
									</label>
								))}
						</div>
					</div>
				) : null}

				<div className="shortcodegenerator__form--row" style={{ marginTop: "3.2rem" }}>
					<strong>Bitte Links vervollständigen.</strong>
					<div className="shortcodegenerator__form--field">
						<label style={{ display: "block", marginTop: ".6rem" }}>AGB</label>
						<input
							type="text"
							style={{ display: "block", width: "100%" }}
							onChange={(e) => setAgbLink(e.target.value)}
							value={agbLink}
						/>
					</div>
					<div className="shortcodegenerator__form--field">
						<label style={{ display: "block", marginTop: ".6rem" }}>Datenschutz</label>
						<input
							type="text"
							style={{ display: "block", width: "100%" }}
							onChange={(e) => setDsgvoLink(e.target.value)}
							value={dsgvoLink}
						/>
					</div>
					<div className="shortcodegenerator__form--field">
						<label style={{ display: "block", marginTop: ".6rem" }}>Redirect</label>
						<input
							type="text"
							style={{ display: "block", width: "100%" }}
							onChange={(e) => setRedirectLinkt(e.target.value)}
							value={redirectLink}
						/>
					</div>
				</div>

				<div className="shortcodegenerator__form--row" style={{ marginTop: "1.6rem" }}>
					<button className="button button-primary" onClick={generateShortcode}>
						Shortcode generieren
					</button>
				</div>

				{shortcode !== "" ? (
					<div className="shortcodegenerator__form--row" style={{ marginTop: "1.6rem" }}>
						<strong>Bitte Kopieren und in deine gewünschte Seite einfügen.</strong>
						<input
							type="text"
							defaultValue={shortcode}
							style={{ display: "block", width: "100%", marginTop: ".4rem" }}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default ShortcodeGenerator;
