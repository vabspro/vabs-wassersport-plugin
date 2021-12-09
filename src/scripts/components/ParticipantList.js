import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/index";
import { groupBy } from "../utils/groupBy";

const ParticipantForm = ({ participant, index, onUpdate }) => {
	const [firstName, setFirstName] = useState(participant.firstName);
	const [lastName, setLastName] = useState(participant.lastName);
	const [mobile, setMobile] = useState(participant.mobile);
	const [email, setEmail] = useState(participant.email);

	const handleInputBlur = () => {
		onUpdate({
			...participant,
			firstName,
			lastName,
			mobile,
			email,
		});
	};
	return (
		<div className="participantlist__form">
			<strong>{index + 1}. Teilnehmer</strong>
			<div className="participantlist__form--grid">
				<label>
					Vorname
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						onBlur={handleInputBlur}
					/>
				</label>
				<label>
					Nachname
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						onBlur={handleInputBlur}
					/>
				</label>

				<label>
					Emailadresse
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={handleInputBlur}
					/>
				</label>

				<label>
					Telefonnummer
					<input
						type="text"
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
						onBlur={handleInputBlur}
					/>
				</label>
			</div>
		</div>
	);
};

function ParticipantList() {
	const [grouped, setGrouped] = useState({});
	const { participants, updateParticipant } = useContext(Context);

	useEffect(() => {
		if (participants.length) {
			setGrouped(groupBy(participants, "course"));
		}
	}, [participants]);

	return (
		<div className="participantlist">
			{participants.length
				? Object.keys(grouped).map((key) => (
						<div key={key}>
							<strong>{key}</strong>
							{grouped[key].map((participant, index) => (
								<ParticipantForm
									index={index}
									key={participant.id}
									participant={participant}
									onUpdate={updateParticipant}
								/>
							))}
						</div>
				  ))
				: null}
		</div>
	);
}

export default ParticipantList;
