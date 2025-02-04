import dayjs from 'dayjs';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React, { Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';

import './index.css';

import 'config/dayjs';
import { i18nConfiguration, webpackBackend } from 'config/i18n';
import Loader from 'loader';

// eslint-disable-next-line import/no-named-as-default-member
i18n
	.use( webpackBackend )
	.use( LanguageDetector )
	.use( initReactI18next )
	.init( {
		...i18nConfiguration( [ 'app', 'pdf', 'config' ] ),
	} );

i18n.on( 'languageChanged', ( newLanguage ) => {
	// This is needed for locales like pt-BR. i18next expects pt-BR,
	// while dayjs expects pt-br.
	const dayjsLanguage = newLanguage.toLowerCase();
	require( 'dayjs/locale/' + dayjsLanguage + '.js' );
	dayjs.locale( dayjsLanguage );
	dayjs.updateLocale( dayjsLanguage, {
		weekStart: 1, // Week starts on Monday
	} );
} );

const loadingComponent = (
	<Spinner
		className="position-absolute top-50 start-50"
		animation="border"
		variant="primary"
		role="status"
	>
		<span className="visually-hidden">Loading...</span>
	</Spinner>
);

const container = document.getElementById( 'root' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Suspense fallback={ loadingComponent }>
			<Loader />
		</Suspense>
	</React.StrictMode>,
);
