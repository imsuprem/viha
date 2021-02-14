import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import './i18nextConf';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
 
  document.getElementById('root')
);

serviceWorkerRegistration.register();
