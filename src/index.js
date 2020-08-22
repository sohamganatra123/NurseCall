import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import  firebase from 'firebase/app';
import { firebaseConfig } from './config/config.js'
import './index.css'


firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter><App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
