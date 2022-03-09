const requiredFields = [
	"firstName",
	"lastName",
	"street",
	"number",
	"zipCode",
	"city",
	"mobile",
	"email",
	"selectedRentals",
	"startDate",
	"endDate",
	"accepted",
];

const errorMessages = {
	firstName: "Dein Vorame ist ein Pflichtfeld.",
	lastName: "Dein Nachname ist ein Pflichtfeld.",
	street: "Die Strasse deiner Anschrift ist ein Pflichtfeld.",
	number: "Die Hausnummer deiner Anschrift ist ein Pflichtfeld.",
	zipCode: "Die Postleitzahl deiner Anschrift ist ein Pflichtfeld.",
	city: "Die Stadt deiner Anschrift ist ein Pflichtfeld.",
	email: "Deine Emailadresse ist ein Pflichtfeld.",
	mobile: "Deine Telefonnummer ist ein Pflichtfeld.",
	startDate: "Mindestens ein zu buchender Tag ist pflicht.",
	endDate: "Mindestens ein zu buchender Tag ist pflicht.",
	selectedCourses: "Um einen Kurs buchen zu können, müssen Sie mindestens einen Kurs auswählen.",
	accepted: "Bitte bestätige das du unsere AGB und Datenschutzrichtlinien gelesen und verstanden hast.",
};

export const useFormValidator = ({ contact, selectedCourses, startDate, setErrors, voucher, recipient, type }) => {
	const errors = {};

	Object.keys(contact).forEach((key) => {
		if (requiredFields.includes(key)) {
			if (contact[key] === "" || contact[key] === false) {
				errors[key] = errorMessages[key];
			}
		}
	});

	if (type === "booking") {
		if (!selectedCourses.length) {
			errors["selectedCourses"] = errorMessages["selectedCourses"];
		}
		if (!startDate) {
			errors["startDate"] = errorMessages["startDate"];
		}
	} else if (type === "voucher") {
		if (recipient === "") {
			errors["recipient"] = "Bitte hinterlege einen Empfänger deines Gutscheines.";
		}

		if (!voucher.item) {
			errors["voucher_item"] = "Bitte wähle die Höhe deines Gutscheines aus.";
		}

		if (!voucher.template) {
			errors["voucher_template"] = "Bitte wähle einen passenden Hintergund deines Gutscheines.";
		}
	}

	setErrors(errors);
	return Object.keys(errors).length === 0;
};
