import React, { useContext } from "react";
import ActivityIndicator from "../components/ActivityIndicator";
import SuccessMessage from "../components/SuccessMessage";
import BillingDetails from "../components/BillingDetails";
import Summary from "../components/Summary";
import FormControls from "../components/FormControls";
import { Context } from "../context/index";
import VoucherForm from "../modules/VoucherForm";
import CoursePicker from "../components/CoursePicker";
import RangePicker from "../components/RangePicker";
import ParticipantList from "../components/ParticipantList";
import { BookingFormSection } from "../components/BookingFormSection";
import { BookingFormHeader } from "../components/BookingFormHeader";
import BookingFormWrapper from "../components/BookingFormWrapper";
import BookingFormAside from "../components/BookingFormAside";
import BookingFormSlider from "../components/BookingFormSlider";
import ErrorBoundary from "../components/ErrorBoundary";

function App({ form: type, type: querytype, query, redirect, agb, datenschutz }) {
	const { loading, success } = useContext(Context);

	let render = (
		<div className="bookingform">
			{loading ? <ActivityIndicator /> : null}
			<BookingFormSlider>
				<BookingFormWrapper>
					<BookingFormSection>
						<ErrorBoundary>
							<BookingFormHeader
								title="1. Reisezeitraum"
								description="Um dir die bestmöglich Windausbeute garantieren zu können, benötigen wir noch deinen Urlaubszeitraum."
							/>
							<RangePicker />
						</ErrorBoundary>
					</BookingFormSection>

					<BookingFormSection>
						<ErrorBoundary>
							<BookingFormHeader
								title="2. Kursauswahl"
								description="welchen Kurs möchtest du besuchen?"
							/>
							<CoursePicker querytype={querytype} query={query} />
						</ErrorBoundary>
					</BookingFormSection>

					<BookingFormSection>
						<ErrorBoundary>
							<BookingFormHeader
								title="3. Teilnehmer"
								description="Füge deiner Kursauswahl Teilnehmer hinzu."
							/>
							<ParticipantList />
						</ErrorBoundary>
					</BookingFormSection>

					<BookingFormSection>
						<ErrorBoundary>
							<BookingFormHeader
								title="4. Rechnungsdetails"
								description="Trage hier die Angaben des Rechnungsempfängers ein."
							/>
							<BillingDetails />
						</ErrorBoundary>
					</BookingFormSection>

					<BookingFormSection>
						<ErrorBoundary>
							<BookingFormHeader
								title="5. Zusammenfassung"
								description="Überprüfe deine Daten, bevor du deine Buchung absendest"
							/>
							<Summary agbLink={agb} datenschutzLink={datenschutz} />
						</ErrorBoundary>
					</BookingFormSection>
				</BookingFormWrapper>
			</BookingFormSlider>

			<BookingFormAside>
				<ErrorBoundary>
					<FormControls redirectLink={redirect} />
				</ErrorBoundary>
			</BookingFormAside>
		</div>
	);

	if (type === "voucher") {
		render = (
			<BookingFormSlider>
				{loading ? <ActivityIndicator /> : null}
				<BookingFormWrapper>
					<BookingFormSection>
						<ErrorBoundary>
							<VoucherForm />
						</ErrorBoundary>
					</BookingFormSection>
					<BookingFormSection>
						<ErrorBoundary>
							<BillingDetails />
						</ErrorBoundary>
					</BookingFormSection>

					<BookingFormSection>
						<ErrorBoundary>
							<Summary />
						</ErrorBoundary>
					</BookingFormSection>
				</BookingFormWrapper>
				<BookingFormAside>
					<ErrorBoundary>
						<FormControls redirectLink={redirect} agbLink={agb} datenschutzLink={datenschutz} />
					</ErrorBoundary>
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
						<ErrorBoundary>
							<BillingDetails />
						</ErrorBoundary>
					</BookingFormSection>
				</BookingFormWrapper>
				<BookingFormAside>
					<ErrorBoundary>
						<FormControls redirectLink={redirect} agbLink={agb} datenschutzLink={datenschutz} />
					</ErrorBoundary>
				</BookingFormAside>
			</BookingFormSlider>
		);
	}

	return success ? <SuccessMessage /> : render;
}

export default App;
