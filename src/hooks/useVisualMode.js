import { useState } from 'react';


const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode); //If a new mode is passed, set it to the new mode.
    setHistory([newMode, ...history]);
    //console.log('newMode', newMode);
  };

  
  const back = () => {
    const [lastAddedMode, ...rest] = history;
    //console.log('prevMode', prevMode);
    // console.log('zero', rest[0]);
    // console.log('history', history);
    //console.log('pop', history.pop());
    // console.log('history length', history[history.length - 2]);
    //console.log('slice', history.slice(0, -1));
    //console.log('mode', mode);
    if (history.length > 1) {
      setMode(rest[0]);
      setHistory([...rest]);
      //console.log('rest', rest);
      //console.log('rest...', [...rest]);
      // console.log('history after slice', history);
      // console.log('history after pop', history[history.length - 2]);
      return;
    }

    setMode(history[0]);
  };

  return { 
    mode,
    transition,
    back
  };
};

export default useVisualMode;