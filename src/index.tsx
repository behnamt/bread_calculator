import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import { OrbitDBProvider } from './context/orbit-db';

ReactDOM.render(
  <React.StrictMode>
    <OrbitDBProvider>
      <App />
    </OrbitDBProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
