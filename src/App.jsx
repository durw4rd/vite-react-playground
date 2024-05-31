import { useState, useEffect } from 'react'
import './App.css'
// Below are the custom imports
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';

function App() {
  const { hiddenComponentColour } = useFlags();
  const ldClient = useLDClient();

  const [componentVisibility, setComponentVisibility] = useState('hidden');
  const [showComponent, setShowComponent] = useState(false);

  function toggleHiddenComponent() {
    if (componentVisibility === 'hidden') {
      setComponentVisibility('visible');
      setShowComponent(true);
      ldClient?.variation('hidden-component-colour', 'magenta');
    } else {
      setComponentVisibility('hidden');
      setShowComponent(false);
    }
  }

  const HiddenComponent = () => {
    return (
      <div style={{ 
        width: '100%', 
        height: '200px', 
        backgroundColor: hiddenComponentColour,
        alignContent: 'center',
        visibility: componentVisibility
      }}>
        <h2>Hidden Component</h2>
      </div>
    )
  }

  return (
    <>
      <h1>Vite React Playground</h1>
      <div className="card">
        <button onClick={toggleHiddenComponent} className="border-2 rounded-md bg-blue-500 text-white" id="my-special-button">
          { showComponent ? "Hide hidden component" : "Show hidden component" }
        </button>
      </div>
      <div className="card">
        <HiddenComponent />
      </div>
    </>
  )
}

export default App
