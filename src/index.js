import React from 'react';
import { hydrate, render } from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import './index.css';

(async () => {
	try {
		await Sentry.init({
			dsn: process.env.REACT_APP_SENTRY_PUBLIC_URL,
			integrations: [new Integrations.BrowserTracing()],
			tracesSampleRate: 1.0,
		});
	} catch (e) {
		console.log(e);
	}
})();

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
	hydrate(<App />, rootElement);
} else {
	render(<App />, rootElement);
}
