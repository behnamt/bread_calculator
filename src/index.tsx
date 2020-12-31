import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import App from './components/organisms/App/App';
import { OrbitDBProvider } from './context/orbit-db';
import commonEn from './translations/en/common.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      common: commonEn,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <OrbitDBProvider>
        <App />
      </OrbitDBProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
