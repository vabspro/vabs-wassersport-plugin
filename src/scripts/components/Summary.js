import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/index";
import moment from "moment";
import ErrorMessage from "./ErrorMessage";

function Summary({ agbLink, datenschutzLink }) {
	const [total, setTotal] = useState(0);
	const { contact, startDate, endDate, globalSettings, voucher, recipient, participants, selectedCourses } =
		useContext(Context);

	const { links, redirect } = globalSettings;
	const settings = {
		agb: agbLink && agbLink !== "" ? agbLink : links?.agb,
		datenschutz: datenschutzLink && datenschutzLink !== "" ? datenschutzLink : links?.dsgvo,
	};

	useEffect(() => {
		if (selectedCourses.length) {
			let totalPrice = 0;

			selectedCourses.forEach((course) => {
				if (course.price) {
					totalPrice += parseFloat(course.price.price) * course.amount;
				}
			});

			setTotal(totalPrice);
		}
	}, [selectedCourses]);

	return (
		<div className="summary">
			<div className="summary__container">
				<div className="summary__section">
					{startDate || endDate ? (
						<>
							<strong>Zeitraum</strong>
							<p>
								{startDate ? moment(startDate).format("DD.MM.YYYY") : null}
								{endDate
									? ` - ${moment(endDate).format("DD.MM.YYYY")}`
									: ` - ${moment(startDate).format("DD.MM.YYYY")}`}
							</p>
						</>
					) : null}

					{contact.firstName ||
					contact.lastName ||
					contact.street ||
					contact.number ||
					contact.zipCode ||
					contact.city ||
					contact.mobile ||
					contact.email ? (
						<>
							<strong>Anschrift</strong>
							<p>
								{contact.firstName} {contact.lastName} <br />
								{contact.street} {contact.number} <br />
								{contact.zipCode} {contact.city}
								<br />
								<br />
								{contact.mobile}
								<br />
								{contact.email}
							</p>
						</>
					) : null}
				</div>
				<div className="summary__section">
					<strong>Zusammenfassung</strong>
					{selectedCourses.length ? (
						<div className="summary__section--courses">
							<ul>
								{selectedCourses.map((course, index) => (
									<li key={index}>
										<h3>{course.name}</h3>
										<span>
											<strong>Teilnehmer:</strong>
											{course.amount}
										</span>
										<span>
											<strong>Anzahl:</strong> {course.quantity}
										</span>
										<span>
											<strong>Preis:</strong>
											{course.price &&
												(parseFloat(course?.price.price) * course.amount).toFixed(2)}
											€
										</span>
									</li>
								))}
							</ul>
							<strong>
								<span>Gesamtsumme</span>

								<span>{total.toFixed(2)}€</span>
							</strong>
						</div>
					) : null}

					{voucher.item || voucher.template ? (
						<li className="summary__section--voucher">
							<div
								className="summary__section--voucher-image"
								style={{ backgroundImage: `url(${voucher.template?.smallImageWebPath})` }}
							/>
							<div className="summary__section--voucher-recipient">
								<span>Empfänger</span>
								{recipient}
							</div>
							<div className="summary__section--voucher-price">
								<span>Wert</span>
								{voucher.item ? `${voucher.item?.unitPrice}€` : null}
							</div>
							<div className="summary__section--voucher-price">
								<span>Betrag</span>
								{voucher.item && voucher.item.discount
									? `${
											voucher.item.unitPrice -
											voucher.item.unitPrice * (voucher.item.discount / 100)
									  }€`
									: null}
							</div>
						</li>
					) : null}

					{contact.message ? (
						<>
							<strong>Bemerkung</strong>
							<p>{contact.message}</p>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Summary;
