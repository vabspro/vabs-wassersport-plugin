import { fetchDataAsync } from "../utils/fetchDataAsync";
import { useErrorHandler } from "./useErrorHandler";

const createContactId = async ({ firstName, lastName, street, zipCode, city, email, mobile, message, lead, type }) => {
	return await fetchDataAsync({
		action: "/create_contact_id",
		data: {
			firstName,
			lastName,
			street,
			zipCode,
			city,
			email,
			mobile,
			message,
			lead,
			shorttext: type == "contact" ? "Anfrageformular" : null,
		},
	});
};

const createSalesHeader = async ({ contact_id }) => {
	return await fetchDataAsync({
		action: "/create_salesheader_id",
		data: { contact_id },
	});
};

const createSalesHeaderLine = async ({
	id,
	salesHeaderId,
	startDate,
	endDate,
	startTime,
	endTime,
	ship_to_contact_id,
	voucher_template_id,
	object_code,
}) => {
	return await fetchDataAsync({
		action: "/create_salesline_id",
		data: {
			id,
			salesHeaderId,
			quantity: 1,
			startDate,
			endDate,
			startTime,
			endTime,
			ship_to_contact_id,
			voucher_template_id,
			object_code,
		},
	});
};

const createSalesInvoice = async (salesHeaderID) => {
	console.log(salesHeaderID);
	return await fetchDataAsync({
		action: `/create_sales_invoice_id?sales_header_id=${salesHeaderID}`,
		data: null,
	});
};

export const useVabsConnection = async ({
	contact,
	startDate,
	endDate,
	selectedCourses,
	setLoading,
	redirect,
	voucher,
	recipient,
	setSuccess,
	type,
	participants,
}) => {
	setLoading(true);
	/**
	 * create contact
	 */
	const contactPayload = {
		firstName: contact.firstName,
		lastName: contact.lastName,
		street: `${contact.street} ${contact.number}`,
		zipCode: contact.zipCode,
		city: contact.city,
		email: contact.email,
		mobile: contact.mobile,
		message: contact.message,
		note: contact.message,
		lead: true,
		type,
	};
	const { contact_id } = await createContactId(contactPayload);
	console.log({ contact_id });

	if (!contact_id) {
		useErrorHandler({
			message: "contact_id could not be established",
			payload: contactPayload,
			action: "createContactId",
		});
		setLoading(false);
		window.alert(
			"Uppps, da ist etwas schief gelaufen. Zur Zeit ist unser Server nicht erreichbar, bitte versuche es zu einem späteren Zeitpunkt erneut. Vielen Dank für dein Verständnis."
		);

		return;
	}

	if (type === "contact") {
		setLoading(false);
		setSuccess(true);
		if (redirect && redirect !== "") {
			window.location = redirect;
		}
		return;
	}
	//const assignedInterestToContact = await assignInterestToContact(contact_id);
	/**
	 * create sales header
	 */
	const { sales_header_id: salesHeaderID, document_id } = await createSalesHeader({ contact_id });
	console.log({ salesHeaderID });

	if (!salesHeaderID) {
		useErrorHandler({
			message: "sales_header could not be created",
			payload: { contact_id },
			action: "createSalesHeader",
		});
		setLoading(false);
		window.alert(
			"Uppps, da ist etwas schief gelaufen. Zur Zeit ist unser Server nicht erreichbar, bitte versuche es zu einem späteren Zeitpunkt erneut. Vielen Dank für dein Verständnis."
		);
		return;
	}

	/**
	 * create sales lines
	 */
	if (type === "voucher") {
		/**
		 * create ship to contact id (recipient)
		 */

		const shipToPayload = {
			firstName: recipient.split(" ")[0],
			lastName: recipient.split(" ")[1] ? recipient.split(" ")[1] : recipient.split(" ")[0],
			email: "xxx@xxx.xx",
			mobile: "00000000",
			shorttext: "Interesse: Gutschein",
		};
		const { contact_id: ship_to_contact_id } = await createContactId(shipToPayload);
		if (!ship_to_contact_id) {
			useErrorHandler({
				message: "ship to contact could not be created",
				payload: { shipToPayload },
				action: "createContactId for recipient, useVabsConnection.js line: 99",
			});
			setLoading(false);
			window.alert(
				"Uppps, da ist etwas schief gelaufen. Zur Zeit ist unser Server nicht erreichbar, bitte versuche es zu einem späteren Zeitpunkt erneut. Vielen Dank für dein Verständnis."
			);
			return;
		}

		/**
		 * create sales line with ship to contact id
		 */
		const salesHeaderLinePayload = {
			id: voucher.item.id,
			salesHeaderId: salesHeaderID,
			ship_to_contact_id: ship_to_contact_id,
			voucher_template_id: voucher.template.id,
			object_code: 8,
			discount: voucher.item?.discount,
		};
		const salesHeaderLine = await createSalesHeaderLine(salesHeaderLinePayload);

		if (!salesHeaderLine) {
			useErrorHandler({
				message: "sales_line could not be created",
				payload: { salesHeaderLinePayload },
				action: "createSalesHeaderLine for recipient, useVabsConnection.js line: 123",
			});
			setLoading(false);
			window.alert(
				"Uppps, da ist etwas schief gelaufen. Zur Zeit ist unser Server nicht erreichbar, bitte versuche es zu einem späteren Zeitpunkt erneut. Vielen Dank für dein Verständnis."
			);
			return;
		}

		const salesInvoice = await createSalesInvoice(salesHeaderID);

		if (!salesInvoice) {
			useErrorHandler({
				message: "sales_invoice could not be created",
				payload: { salesHeaderID },
				action: "createSalesInvoice for recipient, useVabsConnection.js line: 185",
			});
			setLoading(false);
			window.alert(
				"Uppps, da ist etwas schief gelaufen. Zur Zeit ist unser Server nicht erreichbar, bitte versuche es zu einem späteren Zeitpunkt erneut. Vielen Dank für dein Verständnis."
			);
			return;
		} else {
			setLoading(false);
			setSuccess(true);
			if (redirect && redirect !== "") {
				window.location = redirect;
			} else {
				window.alert("Vielen Dank für deine Buchung, diese ist erfolgreich bei uns eingegangen.");
				window.location = window.location.origin;
			}
			return;
		}
	} else {
		/**
		 * create sales line for each selected course
		 */

		const salesLines = await Promise.all(
			participants.map(async (p) => {
				const courseID = p.courseID;

				if (p.firstName !== "") {
					const { contact_id: ship_to_contact_id } = await createContactId({
						firstName: p.firstName,
						lastName: p.lastName,
						email: p.email ? p.email : "xxx@xxx.xx",
						mobile: p.mobile ? p.mobile : "00000000",
						lead: null,
					});
					const { sales_line_id } = await createSalesHeaderLine({
						id: courseID,
						salesHeaderId: salesHeaderID,
						ship_to_contact_id: ship_to_contact_id,
						object_code: 3,
						startDate,
						endDate,
					});
					return sales_line_id;
				} else {
					const { sales_line_id } = await createSalesHeaderLine({
						id: courseID,
						salesHeaderId: salesHeaderID,
						ship_to_contact_id: contact_id,
						object_code: 3,
						startDate,
						endDate,
					});

					return sales_line_id;
				}
			})
		)
			.then(() => {
				setLoading(false);
				setSuccess(true);
				if (redirect && redirect !== "") {
					window.location = redirect;
				} else {
					window.alert("Vielen Dank für deine Buchung, diese ist erfolgreich bei uns eingegangen.");
					window.location = window.location.origin;
				}
				return;
			})
			.catch((err) => {
				useErrorHandler({
					message: "sales_lines could not be created",
					payload: { error: err, participants, selectedCourses, salesHeaderID },
					action: "createSalesLineID, useVabsConnection.js line: 223",
				});
				setLoading(false);
				window.alert(
					"Uppps, da ist etwas schief gelaufen. Zur Zeit ist unser Server nicht erreichbar, bitte versuche es zu einem späteren Zeitpunkt erneut. Vielen Dank für dein Verständnis."
				);
				return;
			});
	}
};
