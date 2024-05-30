import { useState, useEffect } from 'react'
import './App.css'
// Below are the custom imports
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';

function App() {
  const [count, setCount] = useState(0)

  const { exampleBooleanFlag } = useFlags();
  const ldClient = useLDClient();

  // const flagsFromClient = ldClient.allFlags(); // THROWS ERROR

  // console.log(flags.exampleBooleanFlag);
  // console.log(ldClient); // RETURNS UNDEFINED
  // console.log(flagsFromClient);

  // Cody's code
  async function getUserContext() {
    const context = await ldClient?.getContext()
    console.log(context)
    return context
  }



  return (
    <>
      <h1>Vite React Playground</h1>
      <div className="card">
        <button onClick={getUserContext} className="border-2 rounded-md bg-blue-500 text-white">
          Am I connected?
        </button> 
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
