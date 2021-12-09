import React, { useState } from "react";

function AdminSettings({ config }) {
	const settings = JSON.parse(config);
	const [apiToken, setApiToken] = useState(settings?.api_token);
	const [clientId, setClientId] = useState(settings?.client_id);

	const [referrer, setReferrer] = useState(settings?.referrer);
	const [url, setUrl] = useState(settings?.url);

	const [dsgvo, setDsgvo] = useState(settings?.dsgvo);
	const [agb, setAgb] = useState(settings?.agb);
	const [redirect, setRedirect] = useState(settings?.redirect);

	return (
		<>
			<h2>Grundeinstellungen</h2>
			<div className="form__field">
				<label>API TOKEN</label>
				<input
					type="text"
					className="form__field--input"
					name="api_token"
					value={apiToken}
					onChange={(e) => setApiToken(e.target.value)}
				/>
			</div>
			<div className="form__field">
				<label>CLIENT ID</label>
				<input
					type="text"
					className="form__field--input"
					name="client_id"
					value={clientId}
					onChange={(e) => setClientId(e.target.value)}
				/>
			</div>
			<div className="form__field">
				<label>URL</label>
				<input
					type="text"
					className="form__field--input"
					name="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>

			<div className="form__field">
				<label>REFERRER ID</label>
				<input
					type="text"
					className="form__field--input"
					name="referrer_id"
					value={referrer}
					onChange={(e) => setReferrer(e.target.value)}
				/>
			</div>

			<h2 style={{ marginTop: "2.4rem" }}>Links</h2>
			<div className="form__field">
				<label>DSGVO LINK</label>
				<input
					type="text"
					className="form__field--input"
					name="dsgvo"
					value={dsgvo}
					onChange={(e) => setDsgvo(e.target.value)}
				/>
			</div>
			<div className="form__field">
				<label>AGB LINK</label>
				<input
					type="text"
					className="form__field--input"
					name="agb"
					value={agb}
					onChange={(e) => setAgb(e.target.value)}
				/>
			</div>

			<div className="form__field">
				<label>REDIRECT LINK</label>
				<input
					type="text"
					className="form__field--input"
					name="redirect"
					value={redirect}
					onChange={(e) => setRedirect(e.target.value)}
				/>
			</div>

			<div className="form__field" style={{ marginTop: "2.4rem" }}>
				<input
					type="submit"
					className="button button-primary"
					value="save changes"
					id="save_main_options"
					style={{ height: 48 }}
				/>
				<span className="loading"></span>
			</div>
		</>
	);
}

export default AdminSettings;
