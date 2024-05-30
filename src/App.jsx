import { useState, useEffect } from 'react'
import './App.css'
// Below are the custom imports
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';

function App() {
  const [count, setCount] = useState(0)

  const { exampleBooleanFlag } = useFlags();
  const ldClient = useLDClient();

  // const flagsFromClient = ldClient.allFlags();

  // console.log(flags.exampleBooleanFlag);
  // console.log(ldClient);
  // console.log(flagsFromClient);

  // Cody's code
  async function getUserContext() {
    const context = ldClient?.getContext()
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
      </div>
    </>
  )
}

export default App
