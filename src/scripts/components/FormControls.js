import React, { useContext, useState, useLayoutEffect } from "react";
import { Context } from "../context/index";
import { useFormValidator } from "../hooks/useFormValidator";
import { useVabsConnection } from "../hooks/useVabsConnection";
import ErrorMessage from "./ErrorMessage";

function FormControls({ agbLink, datenschutzLink, redirectLink }) {
	const {
		errors,
		globalSettings,
		contact,
		setErrors,
		startDate,
		endDate,
		selectedCourses,
		setLoading,
		voucher,
		recipient,
		type,
		setSuccess,
		participants,
	} = useContext(Context);

	const { links, redirect } = globalSettings;
	const settings = {
		agb: agbLink && agbLink !== "" ? agbLink : links?.agb,
		datenschutz: datenschutzLink && datenschutzLink !== "" ? datenschutzLink : links?.dsgvo,
		redirect: redirectLink && redirectLink !== "" ? redirectLink : redirect,
	};

	const sendForm = async () => {
		const response = await useVabsConnection({
			contact,
			startDate,
			endDate,
			selectedCourses,
			setLoading,
			redirect: settings.redirect,
			voucher,
			recipient,
			setSuccess,
			type,
			participants,
		});
	};

	return (
		<div className="formcontrols">
			<label style={{ display: "block" }}>
				<input
					type="checkbox"
					checked={contact.accepted}
					onChange={() => contact.setAccepted(!contact.accepted)}
				/>
				<span style={{ fontSize: "12px" }}>
					Hiermit bestätige ich die
					{settings.agb !== "" ? (
						<a
							href={settings?.agb}
							target="blank"
							style={{
								margin: "0 4px",
								textDecoration: "underline",
							}}
						>
							AGB
						</a>
					) : (
						" AGB "
					)}
					und
					{settings?.datenschutz !== "" ? (
						<a
							href={settings?.datenschutz}
							target="blank"
							style={{
								margin: "0 4px",
								textDecoration: "underline",
							}}
						>
							Datenschutzvereinbarung
						</a>
					) : (
						" Datenschutzvereinbarung "
					)}
					gelesen und verstanden zu haben und stimme diesen zu.
				</span>
				<ErrorMessage type="accepted" />
			</label>
			<button
				className="button button-primary"
				onClick={() => {
					if (
						useFormValidator({
							contact,
							setErrors,
							startDate,
							endDate,
							selectedCourses,
							voucher,
							recipient,
							type,
						}) === true
					) {
						sendForm();
					}
				}}
			>
				{type !== "contact" ? "kostenpflichtig bestellen" : "absenden"}
			</button>
			{Object.keys(errors).length ? (
				<p style={{ color: "orangered" }}>
					Uppps, Es gibt Fehler in deinem Formular, bitte überprüfe deine Eingabe.
				</p>
			) : null}
		</div>
	);
}

export default FormControls;
