// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import configureStore from './store/store';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
let CLIENT_ID = '624972859268-hh93km802k8r3nqdq81kc9e0puesb77q.apps.googleusercontent.com';
let API_KEY = 'AIzaSyAIFE0VPdWqZx2D6tDICfD8pZzTMWu9W7s';
let DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
let SCOPES = 'https://www.googleapis.com/auth/calendar.events';
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={configureStore()}>
        <GoogleOAuthProvider
          apiKey={API_KEY}
          clientId={CLIENT_ID}
          discoveryDocs={DISCOVERY_DOCS}
          scope={SCOPES}
          // clientId="49041614094-b8f21uke9f12l1k6k3cvjtjsu9j69948.apps.googleusercontent.com"
        >
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
