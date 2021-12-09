import React from "react";
import ReactDOM from "react-dom";
import { ContextProvider } from "../context";

import ShortcodeGenerator from "../modules/ShortcodeGenerator";
import AdminSettings from "../modules/AdminSettings";

import "../../styles/backend/styles.sass";

const element = document.querySelector(".vabs__dashboard");

if (element && element.dataset.type === "shortcode-generator") {
	ReactDOM.render(
		<ContextProvider>
			<ShortcodeGenerator />
		</ContextProvider>,
		element
	);
}

if (element && element.dataset.type === "settingsform") {
	ReactDOM.render(
		<ContextProvider>
			<AdminSettings {...element.dataset} />
		</ContextProvider>,
		element
	);
}
