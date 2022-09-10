import { useState } from 'react';


const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => { //Transition to a new mode.
    setMode(newMode);
    
    if (!replace) { //If replace is true, add the newMode to history.
      setHistory(prev => [...prev, newMode]); //The new mode is added at the top of the stack.
    };
  };

  
  const back = () => { //Go back to the previous mode in our history array.

    if (history.length > 1) { //Limit added because the user shouldn't go back past the initial mode.
      setMode(history[history.length - 2]); //Always take the prev mode, second to last in the array.
      setHistory((history.slice(0, history.length - 1))); //Remove the last element from the array. Chose slice because it doesn't change the original array.
    };
  };


  return { 
    mode,
    transition,
    back
  };
};

export default useVisualMode;