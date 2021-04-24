import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
    dsn:
        'https://945c88d938cb43d0bfd4d82ab010eaee@o527287.ingest.sentry.io/5734521',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));
