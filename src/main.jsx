import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Below are the custom imports
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk"
import { basicLogger } from "launchdarkly-js-client-sdk"

const clientSideID = process.env.REACT_APP_LD_CLIENT_ID;

(async () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})();

