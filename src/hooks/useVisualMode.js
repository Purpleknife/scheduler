import { useState } from 'react';


const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);

  const transition = (newMode) => {
    if (newMode) {
      return setMode(newMode); //If a new mode is passed, set it to the new mode.
    }
    setMode(mode); //Else, just keep the current one.
  };

  return { 
    mode,
    transition
  };
};

export default useVisualMode;