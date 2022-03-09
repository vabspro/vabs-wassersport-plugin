import React from "react";
import { useErrorHandler } from "../hooks/useErrorHandler";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		//errorService.log({ error, errorInfo });
		const sendErrorMessage = useErrorHandler(error);
	}

	render() {
		if (this.state.hasError) {
			return <h1>Oops, something went wrong.</h1>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
