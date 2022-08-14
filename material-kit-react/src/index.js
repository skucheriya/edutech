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
let DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
let SCOPES = 'https://www.googleapis.com/auth/calendar.events';
console.log("process.env.NODE_ENV",process.env.NODE_ENV)
console.log("clientId",process.env.REACT_APP_CLIENT_ID)
console.log("apiKey",process.env.REACT_APP_API_KEY)
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={configureStore()}>
        <GoogleOAuthProvider
          apiKey={process.env.REACT_APP_API_KEY}
          clientId={process.env.REACT_APP_CLIENT_ID}
          discoveryDocs={DISCOVERY_DOCS}
          scope={SCOPES}        
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
