import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import './index.css';

Sentry.init({
	dsn:
		'https://7f9f99f631f64df49f75aa5550dbc484@o578353.ingest.sentry.io/5734533',
	integrations: [new Integrations.BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));
