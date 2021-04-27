import React from 'react';
import { hydrate, render } from 'react-dom';
<<<<<<< HEAD
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import './index.css';

Sentry.init({
	dsn: process.env.REACT_SENTRY_URL,
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0,
});

=======
import App from './App';
import './index.css';

>>>>>>> 6be3c2e0a34d03ff41e186acb49f67a3fc28b7c7
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
	hydrate(<App />, rootElement);
} else {
	render(<App />, rootElement);
}
