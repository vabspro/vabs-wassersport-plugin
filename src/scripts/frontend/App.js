import React, { useContext } from "react";
import ActivityIndicator from "../components/ActivityIndicator";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import BillingDetails from "../components/BillingDetails";
import Summary from "../components/Summary";
import FormControls from "../components/FormControls";
import { Context } from "../context/index";
import VoucherForm from "../modules/VoucherForm";
import { useContainerSize } from "../hooks/useContainerSize";
import CoursePicker from "../components/CoursePicker";
import RangePicker from "../components/RangePicker";
import ParticipantList from "../components/ParticipantList";
import { BookingFormSection } from "../components/BookingFormSection";
import { BookingFormHeader } from "../components/BookingFormHeader";
import BookingFormWrapper from "../components/BookingFormWrapper";
import BookingFormAside from "../components/BookingFormAside";
import BookingFormSlider from "../components/BookingFormSlider";

function App({ form: type, type: querytype, query, redirect, agb, datenschutz }) {
	const { loading, success, currentIndex } = useContext(Context);

	let render = (
		<div className="bookingform">
			{loading ? <ActivityIndicator /> : null}
			<BookingFormSlider>
				<BookingFormWrapper>
					<BookingFormSection>
						<BookingFormHeader
							title="1. Reisezeitraum"
							description="Um dir die bestmöglich Windausbeute garantieren zu können, benötigen wir noch deinen Urlaubszeitraum."
						/>
						<RangePicker />
					</BookingFormSection>

					<BookingFormSection>
						<BookingFormHeader title="2. Kursauswahl" description="welchen Kurs möchtest du besuchen?" />
						<CoursePicker querytype={querytype} query={query} />
					</BookingFormSection>

					<BookingFormSection>
						<BookingFormHeader
							title="3. Teilnehmer"
							description="Füge deiner Kursauswahl Teilnehmer hinzu."
						/>
						<ParticipantList />
					</BookingFormSection>

					<BookingFormSection>
						<BookingFormHeader
							title="4. Rechnungsdetails"
							description="Trage hier die Angaben des Rechnungsempfängers ein."
						/>
						<BillingDetails />
					</BookingFormSection>

					<BookingFormSection>
						<BookingFormHeader
							title="5. Zusammenfassung"
							description="Überprüfe deine Daten, bevor du deine Buchung absendest"
						/>
						<Summary agbLink={agb} datenschutzLink={datenschutz} />
					</BookingFormSection>
				</BookingFormWrapper>
			</BookingFormSlider>

			<BookingFormAside>
				<FormControls redirectLink={redirect} />
			</BookingFormAside>
		</div>
	);

	if (type === "voucher") {
		render = (
			<BookingFormSlider>
				{loading ? <ActivityIndicator /> : null}
				<BookingFormWrapper>
					<BookingFormSection>
						<VoucherForm />
					</BookingFormSection>
					<BookingFormSection>
						<BillingDetails />
					</BookingFormSection>

					<BookingFormSection>
						<Summary />
					</BookingFormSection>
				</BookingFormWrapper>
				<BookingFormAside>
					<FormControls redirectLink={redirect} agbLink={agb} datenschutzLink={datenschutz} />
				</BookingFormAside>
			</BookingFormSlider>
		);
	}

	if (type === "contact") {
		render = (
			<BookingFormSlider>
				{loading ? <ActivityIndicator /> : null}
				<BookingFormWrapper>
					<BookingFormSection>
						<BillingDetails />
					</BookingFormSection>
				</BookingFormWrapper>
				<BookingFormAside>
					<FormControls redirectLink={redirect} agbLink={agb} datenschutzLink={datenschutz} />
				</BookingFormAside>
			</BookingFormSlider>
		);
	}

	return success ? <SuccessMessage /> : render;
}

export default App;
