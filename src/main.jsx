import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Below are the custom imports
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk"
import { basicLogger } from "launchdarkly-js-client-sdk"
import { faker } from '@faker-js/faker'

const ldClientSideID = process.env.REACT_APP_LD_CLIENT_ID;
const ldDefaultContext = {
  kind: 'user',
  key: faker.string.uuid(),
  name: faker.person.fullName()
};
const ldInitOptions = {
  logger: basicLogger({
    level: "info",
  }),
  application: {
    version: "1.0.1",
    id: "vite-react-playground",
  }
};

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: ldClientSideID,
    context: ldDefaultContext,
    // options: ldInitOptions,
  });

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  )
})();
