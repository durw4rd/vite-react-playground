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

const flagEvalHandler = (flagKey, flagDetail) => {
  let {
    reason,
    variationIndex,
    value
  } = flagDetail;
  
  console.log(flagDetail);

  if (reason?.inExperiment === true) {
    console.log(`##ANALYTICS## Flag ${flagKey} was evaluated to ${value} with variation index: ${variationIndex} and reason: ${reason}`);
  }
}

const ldInitOptions = {
  logger: basicLogger({
    level: "info",
  }),
  inspectors: [{
    type: "flag-used",
    name: "example-flag-used",
    method: flagEvalHandler,
  }],
  application: {
    version: "1.0.1",
    id: "vite-react-playground",
  }
};

const ldReactOptions = {
  sendEventsOnFlagRead: false,
  useCamelCaseFlagKeys: true
};

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: ldClientSideID,
    context: ldDefaultContext,
    options: ldInitOptions,
    reactOptions: ldReactOptions
  });

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  )
})();
